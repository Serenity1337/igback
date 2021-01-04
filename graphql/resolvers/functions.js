const User = require('../../models/userModel')

const Post = require('../../models/postModel')

const Comment = require('../../models/commentModel')

const Reply = require('../../models/replyModel')

const user = (userId) => {
  return User.findById(userId)
    .then((user) => {
      return {
        ...user._doc,
        _id: user.id,
        posts: posts.bind(this, user._doc.posts),
        comments: comments.bind(this, user._doc.comments),
      }
    })
    .catch((err) => {
      throw err
    })
}

const post = (postId) => {
  return Post.findById(postId).then((post) => {
    return {
      ...post._doc,
      _id: post.id,
      comments: comments.bind(this, post._doc.comments),
      poster: user.bind(this, post.poster),
    }
  })
}
const comment = (commentId) => {
  return Comment.findById(commentId).then((comment) => {
    return {
      ...comment._doc,
      _id: comment.id,
      replies: replies.bind(this, comment.replies),
    }
  })
}
const posts = (postsIds) => {
  return Post.find({ _id: { $in: postsIds } }).then((posts) => {
    return posts.map((post) => {
      return {
        ...post._doc,
        _id: post.id,
        user: user.bind(this, post.user),
        comments: comments.bind(this, post.comments),
        poster: user.bind(this, post.poster),
      }
    })
  })
}

const comments = (commentsIds) => {
  return Comment.find({ _id: { $in: commentsIds } }).then((comments) => {
    return comments.map((comment) => {
      return {
        ...comment._doc,
        _id: comment.id,
        poster: user.bind(this, comment.poster),
        replies: replies.bind(this, comment.replies),
      }
    })
  })
}

const replies = (repliesIds) => {
  return Reply.find({ _id: { $in: repliesIds } }).then((replies) => {
    return replies.map((reply) => {
      return {
        ...reply._doc,
        _id: reply.id,
        poster: user.bind(this, reply.poster),
        comment: comment.bind(this, reply.comment),
      }
    })
  })
}

exports.user = user
exports.post = post
exports.comment = comment
exports.posts = posts
exports.comments = comments
exports.replies = replies
