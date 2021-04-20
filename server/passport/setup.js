import bcrypt from 'bcrypt'
import userAcc from '../models/users.js'
import passport from 'passport'
import  LocalStrategy from 'passport-local'
const {Strategy} = LocalStrategy


passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    userAcc.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local',
    new LocalStrategy({usernameField: "email", passwordField: 'psw'}, async (email, password, done) => {
        userAcc.findOne({email:email})
            .then(user => {
                console.log(user)
                if(!user){
                    return done(null, false, {message: 'No user with that email'});
                } else {
                    try {
                        if (bcrypt.compare(password, user.password)){
                            return done(null, user)
                        } else {
                            return done(null, false, {message:"Incorrect email or password"})
                        }
                    } catch(e) {
                        return done(e)
                    }
                }
            })


        /*
        ----------------------------------------------------
        OLD CODE THAT DOES NOT WORK, WILL REMOVE EVENTUALLY
        ----------------------------------------------------
        let acc = userAcc.find({email: email})
        console.log(acc)
        if (acc == null ) {
            return done(null, false, {message: 'No user with that email'});
        } 
        try {
            if (await bcrypt.compare(password, acc.password)){
                return done(null, acc)
            } else {
                return done(null, false, {message:"Incorrect email or password"})
            }
        } catch(e) {
            return done(e)
        }
          */ 
    })
);

export default passport