import mongoose from 'mongoose'
var Schema = mongoose.Schema;
var Comments = new Schema({
  comment: {
    type: String,
    required: true
  },
  onPost: {
    type: String,
    required: true
  },
  //This will reference the userID
  commentBy: {
    type: Number,
    required: true,
    //ref: 'User'
  }
});

const Comment = mongoose.model("Comment", Comments)

export default Comment;