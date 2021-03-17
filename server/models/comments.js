var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comments = new Schema({
  commentID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  commentBy: {
    type: String,
    required: true
  },
  commentBody: {
    type: String,
    required: true
  },
  //This will reference the postID
  onPost: {
    type: Number,
    required: true
  },
  //This will reference the userID
  User: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});