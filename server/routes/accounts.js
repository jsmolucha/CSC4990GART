import express from 'express';
import postMessage from '../models/postMessage.js'

import users from '../models/users.js'
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

let API_URL = "http://localhost:5000/api/accounts"
router.get('/username/:username', asyncHandler( async (req,res) => {
    console.log("I have been invoked")
    console.log(req.params);
    let username = req.params.username;
    let creator = await users.findOne({username: username})
    // creator = creator.userID;
    console.log("creator: ", creator.userID)

    res.redirect(`${API_URL}/${creator.userID}`)
    // let posts = await postMessage.find({ creator: creator.userID});
    // console.log("posts", posts)

    // if(posts){
    //     console.log("sending data")
    //     // return(posts);
    //     res.send(posts)

    // }

}));

router.get('/creator/:id', asyncHandler( async (req,res) => {

    let creator = req.params.id;

    let user = await users.findOne({ userID: creator})
    console.log(user)
    // user = user.username;
    

    if(user){
        // console.log("sending data", user.username)
        // return(posts);
        res.send(user.username)
    }
}))


export default router