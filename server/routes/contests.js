/* import express from 'express'
import contest from '../models/contests.js'

const router = express.Router() 

router.post('/newContest', (req, res))

const cont = new contest({
    contestID: Date.now(),
    contestname: req.body.title,
    category: req.body.category
});

try {
    await cont.save();
    res.send("contest created");
} catch (err) {
    console.log(err)
}

export default router; */