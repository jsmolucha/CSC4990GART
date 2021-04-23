import express from 'express';
import users from '../models/users.js'
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/populateInfo', async (req, res) => {
    console.log(req.body)
    console.log("dunno")
    const{userID} = req.body
    console.log(userID)
    try{
        const userData = await users.findOne({"userID": userID}).select({"username" : 1, "email" : 1, "fullName" : 1, "_id" : 1})
        console.log(userData)
        res.json(userData)
    }catch(error){
        console.log(error)
    }
});

router.post('/updateAccount', async (req, res) => {
    console.log("this route is working?")
    console.log(req.body)

    try{
        const userData = await users.findById(req.body._id).update({"username" : req.body.username, "email" : req.body.email, "fullName" : req.body.fullName})

        res.redirect(`http://localhost:3000/@${req.body.username}`)
    }catch(error){
        console.log(error)
    }
});

router.get('/changePassLoad', async (req, res) => {
    console.log(req.body)
    console.log("dunno")
    const{userID} = req.body
    console.log(userID)
    try{
        const userData = await users.findOne({"userID": userID}).select({ "_id" : 1})
        console.log(userData)
        res.json(userData)
    }catch(error){
        console.log(error)
    }
});

router.post('/updatePassword', async (req, res) => {
    console.log("this route is working?")
    console.log(req.body)

    try{
        const userData = await users.findById(req.body._id).update({"username" : req.body.username, "email" : req.body.email, "fullName" : req.body.fullName})

        res.redirect(`http://localhost:3000/@${req.body.username}`)
    }catch(error){
        console.log(error)
    }
});

export default router;

