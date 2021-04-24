import express from 'express';
import users from '../models/users.js'
import postMessage from '../models/postMessage.js'
import asyncHandler from 'express-async-handler';
import { updateValidation, passwordValidation, DeleteValidation} from '../validation.js';
import bcrypt from 'bcrypt'

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

    const { error } = updateValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    try{
        const userData = await users.findById(req.body._id).update({"username" : req.body.username, "email" : req.body.email, "fullName" : req.body.fullName})

        res.redirect(`http://localhost:3000/@${req.body.username}`)
    }catch(error){
        console.log(error)
    }
});

router.post('/populatePass', async (req, res) => {
    console.log(req.body)
    console.log("dunno")
    const{userID} = req.body
    console.log(userID)
    try{
        const userData = await users.findOne({"userID": userID}).select({"_id" : 1,"username" : 1,})
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
        let hashedPass = ""

        const { error } = passwordValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        //hashes the users password
        if (req.body.password != null) {
            hashedPass = await bcrypt.hash(req.body.password, 10);
        }
        const userData = await users.findById(req.body._id).update({"password" : hashedPass})

        res.redirect(`http://localhost:3000/@${req.body.username}`)
    }catch(error){
        console.log(error)
    }
});

router.post('/populateDelete', async (req, res) => {
    console.log(req.body)
    console.log("dunno")
    const{userID} = req.body
    console.log(userID)
    try{
        const userData = await users.findOne({"userID": userID}).select({"_id" : 1,"userID": 1,"username" : 1})
        console.log(userData)
        res.json(userData)
    }catch(error){
        console.log(error)
    }
});

router.post('/deleteAccount', async (req, res) => {
    console.log("this route is working?")
    console.log(req.body)

    try{

        const { error } = DeleteValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        const postData = await postMessage.deleteMany({"creator": req.body.userID})
        const userData = await users.findById(req.body._id).remove()

        res.redirect(`http://localhost:3000`)
    }catch(error){
        console.log(error)
    }
});



export default router;

