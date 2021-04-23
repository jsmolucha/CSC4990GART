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
    try {
        const contests = await contest.find();
    
        res.status(200).json(contests);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    });


export default router;  