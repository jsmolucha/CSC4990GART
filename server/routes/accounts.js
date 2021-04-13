import express from 'express';
import postMessage from '../models/postMessage.js'

import users from '../models/users.js'
const router = express.Router();

// import 
import asyncHandler from 'express-async-handler'; 
import { followUser} from '../controllers/auth.js'
import auth from "../middleware/auth.js";

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
router.get('/follow/:username', asyncHandler( async (req,res) => {
    console.log("I have been invoked")
    console.log(req.params);
    let username = req.params.username;

    let account = await users.findOne({ "username": username});
    // console.log("posts", posts)

    if(account){
        console.log("sending data 2")
        // return(posts);
        res.send(account.followers)

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

router.post('/getUsername', asyncHandler(
    async (req,res) =>{
        console.log(req.body)
        // let id = req.body
        // let user = await users.findOne({ userID: creator})
        // console.log(user)
        // // user = user.username;
        
    
        // if(user){
        //     // console.log("sending data", user.username)
        //     // return(posts);
        //     res.send(user.username)
        // }

    }
)

)

//this route id used to follow users
router.patch('/:username/followUser', auth, followUser);


export default router