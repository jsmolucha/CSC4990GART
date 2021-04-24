import express from 'express'
import contest from '../models/contests.js'
import PostMessage from "../models/postMessage.js"

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
    res.send("contest created");
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
router.get('/:contestId', async (req, res) =>{
    const {contestId} = req.params;
    console.log(contestId);

    try{
        const currentContest = await contest.findById(contestId)
        const registeredPost = await PostMessage.find({registrationID : contestId})
        res.status(200).json({contest: currentContest, posts: registeredPost})
    }catch(error){
        console.log(error)
    }

})

router.get('/getSingleContest/:contestId', async (req, res) =>{
console.log(">>>>>>>>>>>", req.params)
    const {contestId} = req.params;
    console.log(contestId);


    try{
        const currentContest = await contest.findById(contestId)
        // const registeredPost = await PostMessage.find({registrationID : contestId})
        res.status(200).json(currentContest)
        // res.send("hello")
    }catch(error){
        console.log(error)
    }

})

export default router;  