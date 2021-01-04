const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  caption: {
        type: String,
        required: true,
      },
  picture: {
         type: String,
         required: true,
       },
  poster: {
         type: Schema.Types.ObjectId,
         ref: 'User'
       },
  comments: [ {
         type: Schema.Types.ObjectId,
         ref: 'Comment'
       }],
  likedBy: {
         type: Array,
         required: true
       },
  date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);

