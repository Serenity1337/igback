const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({

            caption: {
              type: String,
              required: true,
            },
            likedBy: {
              type: Array,
              required: true
            },
            poster: {
              type: Schema.Types.ObjectId,
              ref: 'User'
            },
            date: {
              type: String,
              required: true,
            },
            post: {
              type: Schema.Types.ObjectId,
              ref: 'Post'
            },
            replies: [{
              type: Schema.Types.ObjectId,
              ref: 'Reply'
            }]
});

module.exports = mongoose.model('Comment', commentSchema);

