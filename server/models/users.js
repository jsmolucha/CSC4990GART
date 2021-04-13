import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userID: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    fullName: {
        type: String,
        require: true,
    }, 
    likes: { 
        type: [String], 
        default: [] 
    },
    followers: { 
        type: [String], 
        default: [] 
    },
    following: { 
        type: [String], 
        default: [] 
    },

});

//followers --> people who choose to follow that account
//following


const user = mongoose.model("User", userSchema)

export default user;