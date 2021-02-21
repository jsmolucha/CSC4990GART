const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    }
});


const user = mongoose.model("userData", userSchema)

module.exports = user;