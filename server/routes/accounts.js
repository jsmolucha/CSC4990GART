import express from 'express';
import postMessage from '../models/postMessage.js'
const router = express.Router();

// import 
import asyncHandler from 'express-async-handler'; 


router.get('/:id', asyncHandler( async (req,res) => {
    console.log("I have been invoked")
    console.log(req.params);
    let creator = req.params.id;

    let posts = await postMessage.find({ creator: creator});
    console.log("posts", posts)

    if(posts){
        console.log("sending data")
        // return(posts);
        res.send(posts)

    }

}));


export default router