import express from 'express';
const router = express.Router();

router.get('/userPosts', (req,res) => {
    console.log(res)
});


export default router