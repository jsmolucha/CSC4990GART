
import asyncHandler from 'express-async-handler';
import express from 'express';
import PostMessage from '../models/postMessage.js'
import Users from '../models/users.js'
const router = express.Router();
//this controller will send back all the post that the user likes based on the likes field on the user database
export const userLikes = (async (req, res) => {
    // console.log(">>>", req.body)
    const { userID } = req.body
    // console.log("the userId is ", userID)
    try {
        // const postMessages = await Users.find({"likes":});
        const user = await Users.findOne({ "userID": userID })


        Promise.all(user.likes.map(pid => {
            return PostMessage.findById(pid).exec().catch(err => {
                // convert error to null result in resolved array
                return null;
            });
        })).then(foundPost => {
            foundPost = foundPost.filter(pid => pid !== null);
            // console.log(foundPost);

            res.status(200).json(foundPost);
        }).catch(err => {
            // handle error here
            res.status(404).json({ message: error.message });
        });


    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

//this controller will send back all the post that the user follows based on the following field on the user database
export const userFollows = asyncHandler(async (req, res) => {

        console.log(">>>", req.body)
        const { userID } = req.body
        console.log("the userId is ", userID)
        let liked = []
        try {
            // const postMessages = await Users.find({"likes":});
            const user = await Users.findOne({ "userID": userID })


            Promise.all(user.following.map(uid => {
                return Users.findOne({"userID" : uid}).select({"username" : 1 , "userID" : 2}).exec().catch(err => {
                    // convert error to null result in resolved array
                    return null;
                });
                

            })).then(foundUser => {
                foundUser = foundUser.filter(uid => uid !== null);
                console.log(foundUser);

                res.status(200).json(foundUser);
            }).catch(err => {
                // handle error here
                res.status(404).json({ message: error.message });
            });


        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    })


export default router;
