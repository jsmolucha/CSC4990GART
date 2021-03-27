import express from 'express';
import postMessage from '../models/postMessage.js'
const router = express.Router();

router.get('/userPosts', (req,res) => {
    console.log(req.body);

    let posts = postMessage.find({ creator: req.body.ID});
    console.log(posts)

   return(posts);

});


export default router