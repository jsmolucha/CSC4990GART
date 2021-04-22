/* import mongoose from 'mongoose'

const postContest = mongoose.Schema({
    title: String,
    description: String,
    creator: {
        type: String,
        required: true,
    },
    tags: [String],
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

// const postContest = mongoose.model('postContest', postContest);

export default postContest; */