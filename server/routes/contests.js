import express from 'express'
import contest from '../models/contests.js'
import PostMessage from "../models/postMessage.js"
import auth from "../middleware/auth.js"
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
const router = express.Router()

router.post('/newContest', async (req, res) => {
    console.log(req.body)

    const data = req.body
    const cont = new contest({
        createdAt: new Date().toISOString(),
        ...data
    });

    try {
        await cont.save();
        res.sendStatus.send("contest created");
    } catch (err) {
        console.log(err)
    }
});

router.get('/getContest', async (req, res) => {
    try {
        const contests = await contest.find();

        res.status(200).json(contests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//return Contest and registered posts
router.get('/:contestId', async (req, res) => {
    const { contestId } = req.params;
    console.log(contestId);

    try {
        const currentContest = await contest.findById(contestId)
        const registeredPost = await PostMessage.find({ registrationID: contestId })
        res.status(200).json({ contest: currentContest, posts: registeredPost })
    } catch (error) {
        console.log(error)
    }

})

router.get('/getSingleContest/:contestId', async (req, res) => {
    console.log(">>>>>>>>>>>", req.params)
    const { contestId } = req.params;
    console.log(contestId);


    try {
        const currentContest = await contest.findById(contestId)
        // const registeredPost = await PostMessage.find({registrationID : contestId})
        res.status(200).json(currentContest)
        // res.send("hello")
    } catch (error) {
        console.log(error)
    }

})

router.patch("/setWinner/:id", auth, asyncHandler(async (req, res) => {
    const { id } = req.params; //contestID
    console.log("param id", id)
    if (!req.userID) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id: ${id}`);
    }
    const currentContest = await contest.findById(id);
    // const liker = await User.findOne({ "userID": req.userID })
    const index = currentContest.winners.findIndex((id) => id === String(req.userID));


    if (index === -1) {
        currentContest.winners.push(req.userID);
        // liker.likes.push(id)
    } else {
        currentContest.winners = currentContest.winners.filter((id) => id !== String(req.userID));
        // liker.likes = liker.likes.filter((postId) => postId !== String(id));
    }
    const updatedContest = await contest.findByIdAndUpdate(id, currentContest, {
        new: true,
    });
    // const updatedUser = await User.findByIdAndUpdate(liker._id, liker, {
    //     new: true,
    // });
    res.status(200).json(updatedContest );
}))

export default router;