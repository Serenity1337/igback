const Post = require('../../models/postModel')
const User = require('../../models/userModel')

const {comment,comments,post,posts,replies,user} = require('./functions')

module.exports = {
  createPost: args => {
    const post = new Post({
      caption: args.postInput.caption,
      picture: args.postInput.picture,
      date: args.postInput.date,
      likedBy: args.postInput.likedBy,
      poster: args.postInput.poster
    });
    let posts;
    return post
      .save()
      .then(result => {
        posts = { ...result._doc, _id: result._doc._id.toString(), poster: user.bind(this, result._doc.poster) }
        return User.findById(post.poster)
        
      })
      .then(user => {
        user.posts.push(post)
        return user.save()
      }).then(result => {
        return posts
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  posts: () => {
    return Post.find()
    .then(posts => {
      return posts.map(post => {
        return {
          ...post._doc,
          _id: post.id,
          poster: user.bind(this, post.poster,),
          comments: comments.bind(this, post.comments)
        }
      })
    })
    .catch(err => {
      throw err;
    })

  },
  postUpdate: args => {
    return new Promise ((resolve, reject)=> {
      Post.findOneAndUpdate(
        {_id: args.postUpdateInput.id},
        {
          $set: {
            likedBy: args.postUpdateInput.likedBy
      
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