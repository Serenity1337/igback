const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  followedBy: {
    type: Array,
    required: true,
  },
  following: {
    type: Array,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  bio: {
    type: String,
  },
  gender: {
    type: String,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reply',
    },
  ],
})

module.exports = mongoose.model('User', userSchema)
