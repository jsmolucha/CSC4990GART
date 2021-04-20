import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import authRoute from './routes/auth.js'
import postRoutes from './routes/posts.js'
import accRoutes from './routes/accounts.js'
import updateRoutes from './routes/update.js'
import testRoute from './routes/test.js'
import passport from './passport/setup.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'



const app = express();
const port = 5000;
// const express = require('express');
// const mongoose = require("mongoose");
// const dotenv = require('dotenv');
// const bodyParser = require("body-parser"); //obsolete
// //routes
// const authRoute = require('./routes/auth');
// const postRoutes = require('./routes/posts.js')
// const cors = require('cors');

dotenv.config();
// console.log(process.env.AWS_S3_BUCKET)

//DB Connection
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
});


app.use(express.json());
app.use(express.urlencoded({extended: true})); //changed bodyparser ->express -carlos
app.use(cors())

app.use(
    session({
      secret: "testing",
      resave: false,
      saveUninitialize: true,
      store: MongoStore.create({mongoUrl:process.env.DB_CONNECT})
    })
)



app.use(passport.initialize())
app.use(passport.session())


app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  //These where added during testing... it may or may not break it, idk -carlos
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Expose-Headers");
    next();
  });


//Routes
app.use('/api/user',authRoute);
app.use("/api/post", postRoutes);
app.use('/api/accounts', accRoutes);
app.use('/api/update', updateRoutes);

app.get('/main', (req, res) => {
  res.send('mainpage');
})




app.listen(port, () => console.log(`Server started on port ${port}`));
mongoose.set('useFindAndModify', false);