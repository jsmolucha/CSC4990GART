const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userAcc = require("./models/users");
const bcrypt = require("bcrypt");
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://Admin1:CSC4990-01@gart-app.7bjx7.mongodb.net/gart-app?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

app.post('/newUser', async (req, res) => {
    const data = req.body;
    let hashedPass = ""
    console.log(data);
    if(req.body.psw != null){
        hashedPass = await bcrypt.hash(req.body.psw, 10);
    }
    const user = new userAcc ({userID: Date.now(), username: req.body.uname, password: hashedPass});

    try {
        await user.save();
        res.send("User added");
    } catch(err){
        console.log(err);
    }

});



app.listen(port, () => console.log(`Server started on port ${port}`));
