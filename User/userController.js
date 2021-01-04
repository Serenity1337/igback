const User = require('./userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

let registerUser = (req, res) => {
  let data = req.body
  let user = new User()

  user.firstName = data.firstName
  user.lastName = data.lastName
  user.email = data.email
  user.phone = data.phone
  user.password = data.password
  user.status = data.status
  user.id = JSON.stringify(Date.now())
  user
    .save()
    .then((createdUser) => {
      res.json(createdUser)
    })
    .catch((e) => {
      res.status(400).json(e)
    })
}


const getSingleUser = async (req, res) => {
  let id = req.user
  try {
    let user = await User.findById(id)
    res.json(user)
  } catch (e) {
    res.status(400).jsn(e)
  }
}
const getUser = async (req, res) => {
  let user = req.user
}
const login = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    })
    if (!user) {
      res.status(404)
      return
    }
    bcrypt.compare(req.body.password, user.password, (err, response) => {
      if (response) {
        let access = 'auth'
        let token = jwt
          .sign(
            {
              _id: user._id.toHexString(),
              access,
            },
            config.password
          )
          .toString()
        user.tokens.push({
          token,
          access,
        })
        user.save().then(() => {
          res.header('x-auth', token).json(user)
        })
      } else {
        res.json('login failed')
      }
    })
  } catch (e) {
    res.status(400).json(e)
  }
}

module.exports = {
  registerUser,
  getAll,
  getSingleUser,
  login,
  getUser,
}
