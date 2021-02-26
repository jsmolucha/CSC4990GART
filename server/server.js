const express = require('express');
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
});

const authRoute = require('./routes/auth');

app.use('/api/user', authRoute);



app.listen(port, () => console.log(`Server started on port ${port}`));
