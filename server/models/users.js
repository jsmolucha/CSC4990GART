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
    }

});


const user = mongoose.model("User", userSchema)

export default user;