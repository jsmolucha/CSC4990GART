const express = require('express');
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const user = require("/models/users");
app.use(express.json());

mongoose.connect("mongodb+srv://Admin1:CSC4990-01@gart-app.7bjx7.mongodb.net/gart-app", {
    useNewUrlParser: true,
});

app.post('/newUser', async (req, res) => {
    const data = req.body;
    const user = new user({userID: Date.now(), username: req.body.username, password: req.body.password});

    try {
        await user.save();
    } catch(err){
        console.log(err);
    }

});



app.listen(port, () => console.log(`Server started on port ${port}`));
