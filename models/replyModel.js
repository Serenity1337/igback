const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({

            caption: {
              type: String,
              required: true,
            },
            poster: {
              type: Schema.Types.ObjectId,
              ref: 'User'
            },
            date: {
              type: String,
              required: true,
            },
            likedBy: {
              type: Array,
              required: true
            },
            comment: {
              type: Schema.Types.ObjectId,
              ref: 'Comment'
            }
});

module.exports = mongoose.model('Reply', replySchema);

