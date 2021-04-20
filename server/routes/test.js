import express from 'express';
import passport from 'passport'
import userAcc from '../models/users.js'



const router = express.Router();

router.post("/login", (req,res,next) => {
    //console.log(req.user);
    passport.authenticate("local", function(err, user, info) {
        //console.log(user.username)
        if (err) {
            console.log(err)
            return res.status(400).json({errors: err});
        }
        if (!user) {
            return res.status(400).json({errors: "No user found"});
        }

        req.logIn(user, function(err) {
            if (err) {
                return res.status(400).json({errors: err})
            }
            console.log(req.sessionID)
            return res.status(200).json({success: `logged in ${user.id}`})
        });
    })(req,res,next);
})




router.get('/authenticate', (req,res,next) => {
    if(req.isAuthenticated()){
        console.log(req.body)
        return req.isAuthenticated()
    }
})

export default router
