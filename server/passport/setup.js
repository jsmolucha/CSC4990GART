import bcrypt from 'bcrypt'
import userAcc from '../models/users.js'
import passport from 'passport'
import  LocalStrategy from 'passport-local'
const {Strategy} = LocalStrategy




passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    new LocalStrategy({usernameField: "email", passwordField: 'password'}, async (email, password, done) => {
        let acc = userAcc.findOne({email: email})
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
           
    })
);

export default passport