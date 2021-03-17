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

// const router = require('express').Router();
// const userAcc = require('../models/users');
// const bcrypt = require("bcrypt");
// const { registerValidation, loginValidation } = require('../validation')
// const jwt = require('jsonwebtoken');
// const asyncHandler = require('express-async-handler')
// const { APP_URL } = require('../utils/constants') //imports react url

const router = express.Router();

router.post('/newUser', async (req, res) => {
    let hashedPass = ""
    //hashes the users password
    if(req.body.psw != null){
        hashedPass = await bcrypt.hash(req.body.psw, 10);
    }

    //Validate user before adding
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)   
    
    //does the user already exist?
    const exists = await userAcc.findOne({email: req.body.email});
    if (exists) return res.status(400).send('Email already exists');

    //creating a new user
    const user = new userAcc ({userID: Date.now(), 
                               username: req.body.uname, 
                               email: req.body.email, 
                               password: hashedPass
                            });

    //saving user to DB
    try {
        await user.save();
        res.send("User added");
    } catch(err){
        console.log(err);
    }

});

/**
 middlewares; testing each ones individually
 will be exported in a file inside a middleware directory (tba) 
-carlos

 */

let validator =  asyncHandler (async (req, res, next) => {
    // console.log("Validator")
    const {error} = await loginValidation(req.body.user);

    if (error) return res.status(400).send(error.details[0].message);
    next()
})
//middle ware
let userFinder = asyncHandler( async (req, res, next) => {
    // console.log("userFinder")
    console.log(req.body)
    res.user = await userAcc.findOne({email: req.body.email});
    
    if (!res.user) return res.status(400).send('Email or Password is Wrong!');
    next()
})
//middleware
let valPasser =  async (req, res, next) => {
    // console.log("valPasser")
    res.valPass = await bcrypt.compare(req.body.psw, res.user.password);
    if(!res.valPass) return res.status(400).send('Email or Password is Wrong!');
    next()
}


router.post('/login', validator, userFinder,valPasser, asyncHandler( async (req, res, next) => {
/*

    These where exported into individual middleware functions -carlos


    const {error} = await loginValidation(req.body.user);
    if (error) return res.status(400).send(error.details[0].message);

    checking if the user exists in the DB
    const user = await userAcc.findOne({email: req.body.user.email});
    if (!user) return res.status(400).send('Email or Password is Wrong!');

    password checking
    console.log(res.user)
    const valPass = await bcrypt.compare(req.body.user.psw, res.user.password);
    if(!valPass) return res.status(400).send('Email or Password is Wrong!');
*/
    //JSON WEBTOKEN
   const token = jwt.sign({id: res.user.userID}, process.env.TOKEN_SECRET);
//    console.log("hello", res.user)
//    const oldUser = await UserModal.findOne({ res.user.email });
//    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    await res.status(200).json({ result: res.user, token });
    console.log(token)

   //Instead of 5000 redirecting, it will send back data(token) to 3000 which could handle redirecting -carlos
// res.header('auth-token', token).redirect("${APP_URL}/main");
    // await res.header('auth-token', token).send(token); 
    //sends token, can alse send an {object} to send more data like username of whatever -carlos

    next();
    
        
}));



export default router;