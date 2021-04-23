import express from 'express';

import PostMessage from "../models/postMessage.js"
import Users from '../models/users.js'
const router = express.Router();


router.get("/tags/:query", async (req, res) => {
    const { query } = req.params;

    console.log("your query is : ", query)
    // res.send(`Your query is ${query}`)

    try { 
        const answer = await PostMessage.find({"tags": {$regex : `.*${query}.*`}})
        if(answer){

            console.log("We found : ", answer)
            res.status(200).json(answer)
        } else{
            res.status(200).json([])
            // res
        }
    }
    catch (error) {
        console.log(error)
    }
})

router.get("/users/:query", async (req, res) => {
    const { query } = req.params;

    console.log("your query is : ", query)
    // res.send(`Your query is ${query}`)

    try { 
        const answer = await Users.find({"username": {$regex : `.*${query}.*`}}).select({"username" : 1, "_id": 0})
        if(answer){
            answer.map( users =>{
                users = users.username
            })
            console.log("We found : ", answer)
            res.status(200).json(answer)
        } else{
            res.status(200).json([])
            // res
        }
    }
    catch (error) {
        console.log(error)
    }
})


router.get("/post/:query", async (req, res) => {
    const { query } = req.params;

    console.log("your query is : ", query)
    // res.send(`Your query is ${query}`)

    try { 
        const answer = await PostMessage.find( {$or : [{"tags": {$regex : `.*${query}.*`}},{"title": {$regex : `.*${query}.*`}},{"description": {$regex : `.*${query}.*`}} ] }  )
        if(answer){

            console.log("We found : ", answer)
            res.status(200).json(answer)
        } else{
            res.status(200).json([])
            // res
        }
    }
    catch (error) {
        console.log(error)
    }
})




// router.post("/searchAll" ,async (req, res) => {
    
//     const {type, query} = req.body;
//     console.log(type, query)
//     // res.send("hello")
//     try { 
//         const answer = await await PostMessage.find({ type : {$regex : `.*${query}.*`}})
//         if(answer){
//             console.log("We found : ", answer)
//             res.status(200).json(answer)
//         } else{
//             res.status(200).json([])
//             // res
//         }
//     }
//     catch (error) {
//         console.log(error)
//     }



// }
// )
export default router;