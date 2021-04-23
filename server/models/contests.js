import mongoose from 'mongoose'

const postContest = mongoose.Schema({
    title: String, 
    description: String,
    creator: {
        type: String,
        required: true,
    },
    category: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const postcontest = mongoose.model('postContest', postContest);

export default postcontest; 