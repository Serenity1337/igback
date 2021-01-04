const Comment = require('../../models/commentModel')

const User = require('../../models/userModel')

const Post = require('../../models/postModel')
const {comment,comments,post,posts,replies,user} = require('./functions')

module.exports = {
  createComment: (args, req) => {

    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }

    const comment = new Comment({
      caption: args.commentInput.caption,
      poster: args.commentInput.poster,
      likedBy: args.commentInput.likedBy,
      post: args.commentInput.post,
      date: args.commentInput.date

    })
    let comments
    return comment
    .save()
    .then(result => {
      comments = { ...result._doc, _id: result._doc._id.toString(),
      poster: user.bind(this, result._doc.poster),
      post: post.bind(this, result._doc.post)
      }
      return User.findById(comment.poster)
      .then(user => {
        user.comments.push(comment)
        return user.save()
      }).then(result => {
        return Post.findById(comment.post)
        .then(post => {
          post.comments.push(comment)
          return post.save()
        }).then(result => {
          return comments
        })
      })
    })
    .catch(err => {
      console.log(err)
      throw err
    })
  },
  comments: () => {
    return Comment.find()
    .then(comments => {
      return comments.map(comment => {
        return {
          ...comment._doc,
          _id: comment.id,
          poster: user.bind(this, comment.poster),
          post: post.bind(this, comment.post),
          replies: replies.bind(this, comment.replies)
        }
      })
    })
  },
  commentUpdate: args => {
    return new Promise ((resolve, reject)=> {
      Comment.findOneAndUpdate(
        {_id: args.commentUpdateInput.id},
        {
          $set: {
            likedBy: args.commentUpdateInput.likedBy
          },
  
        },
        {new: true},
        
      )
    .exec((err, res) => {
          console.log('test', res)
          if(err) reject(err)
          else resolve(res)
      })
    })
  },
}