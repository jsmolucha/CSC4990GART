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
    const hasedPass = ""
    console.log(data);
    if(req.body.password != null){
        hasedPass = await bcrypt.hash(req.body.pass, 10);
    }
    const user = new userAcc ({userID: Date.now(), username: req.body.username, password: hashedPass});
    //const user = new userAcc ({userID: Date.now(), username: "JD", password: "Testing"});

    try {
        await user.save();
        console.log(`User saved as ${user}`);
    } catch(err){
        console.log(err);
    }

});



app.listen(port, () => console.log(`Server started on port ${port}`));
