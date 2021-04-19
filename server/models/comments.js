import mongoose from 'mongoose'
var Schema = mongoose.Schema;
var Comments = new Schema({
  commentID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  commentBody: {
    type: String,
    required: true
  },
  //This will reference the userID
  User: {
    type: Number,
    required: true,
    //ref: 'User'
  }
});

const Comment = mongoose.model("Comment", Comments)

export default Comment;