const router = require('express').Router();
const userAcc = require('../models/users');
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation } = require('../validation')
const jwt = require('jsonwebtoken');


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

router.post('/login', async (req, res, next) => {
    const {error} = loginValidation(req.body.user);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the user exists in the DB
    const user = await userAcc.findOne({email: req.body.user.email});
    if (!user) return res.status(400).send('Email or Password is Wrong!');

    //password checking
    
    const valPass = await bcrypt.compare(req.body.user.psw, user.password);
    if(!valPass) return res.status(400).send('Email or Password is Wrong!');

    //JSON WEBTOKEN
    const token = jwt.sign({id: user.userID}, process.env.TOKEN_SECRET);
    res.header('auth-token', token)

    next();
    
        
});



module.exports = router;