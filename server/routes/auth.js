const router = require('express').Router();
const userAcc = require('../models/users');
const bcrypt = require("bcrypt");


router.post('/newUser', async (req, res) => {
    const data = req.body;
    let hashedPass = ""
    console.log(data);
    if(req.body.psw != null){
        hashedPass = await bcrypt.hash(req.body.psw, 10);
    }
    const user = new userAcc ({userID: Date.now(), 
                               username: req.body.uname, 
                               email: req.body.email, 
                               password: hashedPass
                            });


    try {
        await user.save();
        res.send("User added");
    } catch(err){
        console.log(err);
    }

});



module.exports = router;