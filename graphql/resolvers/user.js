const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

const User = require('../../models/userModel')
const { post, posts } = require('./functions')

module.exports = {
  createUser: async (args) => {
    const existingEmail = await User.findOne({ email: args.userInput.email })
    if (existingEmail) {
      throw new Error('Email is already in use')
    }
    const existingUser = await User.findOne({
      userName: args.userInput.userName,
    })
    if (existingUser) {
      throw new Error('Username is already in use')
    }
    const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
    const user = new User({
      userName: args.userInput.userName,
      password: hashedPassword,
      email: args.userInput.email,
      avatar: args.userInput.avatar,
      followedBy: args.userInput.followedBy,
      following: args.userInput.following,
      bio: args.userInput.bio,
      gender: args.userInput.gender,
      phoneNumber: args.userInput.phoneNumber,
      fullName: args.userInput.fullName,
    })
    return user
      .save()
      .then((result) => {
        return {
          ...result._doc,
          password: null,
          _id: result._doc._id.toString(),
        }
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  },
  passwordUpdate: async (args) => {
    const user = await User.findById(args.userPassUpdateInput.id)

    const oldPassCorrect = await bcrypt.compare(
      args.userPassUpdateInput.oldPass,
      user.password
    )
    if (!oldPassCorrect) {
      throw new Error('Old password is incorrect')
    }
    const hashedPassword = await bcrypt.hash(
      args.userPassUpdateInput.newPass,
      12
    )

    return new Promise((resolve, reject) => {
      User.findOneAndUpdate(
        { _id: args.userPassUpdateInput.id },
        {
          $set: {
            password: hashedPassword,
          },
        },
        { new: true }
      ).exec((err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  },
  avatarUpdate: async (args) => {
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate(
        { _id: args.userAvatarUpdateInput.id },
        {
          $set: {
            avatar: args.userAvatarUpdateInput.avatar,
          },
        },
        { new: true }
      ).exec((err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new Error('User does not exist!')
    }
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      throw new Error('Password is incorrect!')
    }
    const token = JWT.sign(
      { userId: user.id, email: user.email },
      'somesupersecretkey',
      {
        expiresIn: '1h',
      }
    )
    return { userId: user.id, token: token, tokenExpiration: 1 }
  },
  userUpdate: async (args) => {
    const existingEmail = await User.findOne({
      email: args.userUpdateInput.email,
    })
    if (
      existingEmail &&
      JSON.stringify(args.userUpdateInput.id) !==
        JSON.stringify(existingEmail._id)
    ) {
      throw new Error('Email is already in use')
    }
    const existingUser = await User.findOne({
      userName: args.userUpdateInput.userName,
    })
    if (
      existingUser &&
      JSON.stringify(args.userUpdateInput.id) !==
        JSON.stringify(existingUser._id)
    ) {
      throw new Error('Username is already in use')
    }
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate(
        { _id: args.userUpdateInput.id },
        {
          $set: {
            followedBy: args.userUpdateInput.followedBy,
            following: args.userUpdateInput.following,
            phoneNumber: args.userUpdateInput.phoneNumber,
            gender: args.userUpdateInput.gender,
            bio: args.userUpdateInput.bio,
            userName: args.userUpdateInput.userName,
            email: args.userUpdateInput.email,
            fullName: args.userUpdateInput.fullName,
          },
        },
        { new: true }
      ).exec((err, res) => {

        if (err) reject(err)
        else resolve(res)
      })
    })
  },

  user: (id) => {
    return User.findById(id.id).then((user) => {
      return {
        ...user._doc,
        _id: user.id,
        posts: posts.bind(this, user.posts),
      }
    })
  },

  users: () => {
    return User.find().then((users) => {
      return users.map((user) => {
        return {
          ...user._doc,
          _id: user.id,
          posts: posts.bind(this, user.posts),
        }
      })
    })
  },
}
