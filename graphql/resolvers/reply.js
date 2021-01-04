const Reply = require('../../models/replyModel')
const User = require('../../models/userModel')
const Comment = require('../../models/commentModel')

const {comment,comments,post,posts,replies,user} = require('./functions')

module.exports = {
  createReply: args => {
    const reply = new Reply({
      caption: args.replyInput.caption,
      poster: args.replyInput.poster,
      likedBy: args.replyInput.likedBy,
      comment: args.replyInput.comment,
      date: args.replyInput.date

    })
    
    let replies
    return reply
    .save()
    .then(result => {
      console.log(result)
      console.log(result._doc)
      replies = { ...result._doc, _id: result._doc._id.toString(),
      poster: user.bind(this, result._doc.poster),
      comment: comment.bind(this, result._doc.comment)
      }
      return User.findById(reply.poster)
      .then(user => {
        user.replies.push(reply)
        return user.save()
      }).then(result => {
        return Comment.findById(reply.comment)
        .then(comment => {
          comment.replies.push(reply)
          return comment.save()
        }).then(result => {
          return replies
        })
      })
    })
    .catch(err => {
      console.log(err)
      throw err
    })
  },
  replies: () => {
    return Reply.find()
    .then(replies => {
      return replies.map(reply => {
        return {
          ...reply._doc,
          _id: reply.id,
          poster: user.bind(this, reply.poster),
          comment: comment.bind(this, reply.comment)
        }
      })
    })
  },
  replyUpdate: args => {
    return new Promise ((resolve, reject)=> {
      Reply.findOneAndUpdate(
        {_id: args.replyUpdateInput.id},
        {
          $set: {
            likedBy: args.replyUpdateInput.likedBy
      
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
  // replyUpdate: args => {
  //   return new Promise ((resolve, reject)=> {
  //   Reply.update(
  //     { _id: args.replyUpdateInput.id },
  //     {
  //       $set: {
  //         likedBy: args.replyUpdateInput.likedBy
  //       },
  //     }.exec((err, res) => {
  //       if(err) reject(err)
  //       else resolve(res)
  //   })
  //   )
  // })
   
  // }


}