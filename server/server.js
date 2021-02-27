const express = require('express');
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const authRoute = require('./routes/auth');

dotenv.config();

//DB Connection
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
});


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


//Routes
app.use('/api/user', authRoute);



app.listen(port, () => console.log(`Server started on port ${port}`));
