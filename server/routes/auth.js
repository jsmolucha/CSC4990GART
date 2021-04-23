
/** Routes for login and signup
 *  /login has been updated to send a json file per (axios) request
 *  the json is composed of Token (which is stored in the redux store on client side)
 *  and the user info such as username, id, email, encrypted password(test will be removed)
 * 
 *  Middleware have been generated to simplify block; They will be exported to middleware dir soon
 * 
 *  all comments will be removed once sign up/ip has been finished
 * 
 */

import express from 'express';
import userAcc from '../models/users.js'
import bcrypt from 'bcrypt';
import { registerValidation, loginValidation } from '../validation.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';


const router = express.Router();

router.post('/newUser', async (req, res) => {
    let hashedPass = ""
    //hashes the users password
    if (req.body.psw != null) {
        hashedPass = await bcrypt.hash(req.body.psw, 10);
    }

    //Validate user before adding
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //does the user already exist?
    const exists = await userAcc.findOne({ email: req.body.email });
    if (exists) return res.status(400).send('Email already exists');

    //creating a new user
    const user = new userAcc({
        userID: Date.now(),
        username: req.body.uname,
        email: req.body.email,
        password: hashedPass,
        fullName: req.body.fname
    });

    const token = jwt.sign({id: user.userID}, process.env.TOKEN_SECRET);
    //saving user to DB
    try {
        await user.save();
        res.send("User added");
    } catch (err) {
        console.log(err);
    }

});
/**
 middlewares; testing each ones individually
 will be exported in a file inside a middleware directory (tba) 
-carlos

 */
let validator = asyncHandler(async (req, res, next) => {
    const { error } = await loginValidation(req.body.user);

    if (error) return res.status(400).send(error.details[0].message);
    next()
})
//middleware
let userFinder = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    res.user = await userAcc.findOne({ email: req.body.email });

    if (!res.user) return res.status(400).send('Email or Password is Wrong!');
    next()
})
//middleware
let valPasser = async (req, res, next) => {
    res.valPass = await bcrypt.compare(req.body.psw, res.user.password);
    if (!res.valPass) return res.status(400).send('Email or Password is Wrong!');
    next()
}


router.post('/login', validator, userFinder, valPasser, asyncHandler(async (req, res, next) => {

    //JSON WEBTOKEN
    const token = jwt.sign({ id: res.user.userID }, process.env.TOKEN_SECRET);
  
    //Sends back result to the front end to allow for use elswhere
    await res.status(200).json({
        result: {
            "userID": res.user.userID,
            "username": res.user.username,
            "_id": res.user._id
        }, token
    });
  
    next();
}));



export default router;