import express from 'express';
import postMessage from '../models/postMessage.js'
import users from '../models/users.js'
const router = express.Router();
import asyncHandler from 'express-async-handler';
import { followUser } from '../controllers/auth.js'
import { userLikes, userFollows } from '../controllers/accounts.js'
import auth from "../middleware/auth.js";

router.get('/:id', asyncHandler(async (req, res) => {
    let creator = req.params.id;

    let posts = await postMessage.find({ creator: creator });

    if (posts) {
        res.send(posts)
    }

}));
router.get('/follow/:username', asyncHandler(async (req, res) => {
    let username = req.params.username;

    let account = await users.findOne({ "username": username });

    if (account) {
        // return(posts);
        res.send(account.followers)

    }

}));

let API_URL = "http://localhost:5000/api/accounts"
router.get('/username/:username', asyncHandler(async (req, res) => {
    let username = req.params.username;
    let creator = await users.findOne({ username: username })

    res.redirect(`${API_URL}/${creator.userID}`)

}));

router.get('/creator/:id', asyncHandler(async (req, res) => {

    let creator = req.params.id;

    let user = await users.findOne({ userID: creator })
    if (user) {
        res.send(user.username)
    }
}))

router.post('/getUsername', asyncHandler(
    async (req, res) => {
    }
)

)

//this route would send back post based on who the user follows
router.post('/following', userFollows)

router.post('/liked',userLikes)

//this route id used to follow users
router.patch('/:username/followUser', auth, followUser);


export default router