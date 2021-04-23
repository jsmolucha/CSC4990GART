import express from 'express'
import contest from '../models/contests.js'

const router = express.Router() 

router.post('/newContest', async (req, res) => {
console.log(req.body)

const data = req.body
const cont = new contest({
    createdAt: new Date().toISOString(),
    ...data
});

try {
    await cont.save();
    res.send("contest created");
} catch (err) {
    console.log(err)
}
});

router.get('/getContest', async (req, res) => {

});


export default router;  