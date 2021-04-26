import express from 'express';
import PostMessage from "../models/postMessage.js"
import Users from '../models/users.js'
const router = express.Router();

router.get("/tags/:query", async (req, res) => {
    const { query } = req.params;

    try { 
        const answer = await PostMessage.find({"tags": {$regex : `.*${query}.*`}})
        if(answer){
            res.status(200).json(answer)
        } else{
            res.status(200).json([])
        }
    }
    catch (error) {
        console.log(error)
    }
})

router.get("/users/:query", async (req, res) => {
    const { query } = req.params;

    try { 
        const answer = await Users.find({"username": {$regex : `.*(?i)${query}.*`}}).select({"username" : 1, "followers" :1, "following" : 1, "fullName" : 1, "_id": 1})

        res.status(200).json(answer)
        
    }
    catch (error) {
        console.log(error)
    }
})

router.get("/getUserInfo/:query", async (req, res) => {
    const { query } = req.params;
    try { 
        const answer = await Users.findOne({"username": query}).select({"username" : 1, "followers" :1, "following" : 1, "fullName" : 1, "_id": 1})

        res.status(200).json(answer)
        
    }
    catch (error) {
        console.log(error)
    }
})


router.get("/post/:query", async (req, res) => {
    const { query } = req.params;

    try { 
        const answer = await PostMessage.find( {$or : [{"tags": {$regex : `.*(?i)${query}.*`}},
        {"title": {$regex : `.*(?i)${query}.*`}},
        {"description": {$regex : `.*(?i)${query}.*`}},
        {"username": {$regex : `.*(?i)${query}.*`}}
    
    ] }  )
        if(answer){
            res.status(200).json(answer)
        } else{
            res.status(200).json([])
        }
    }
    catch (error) {
        console.log(error)
    }
})

export default router;