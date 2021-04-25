import asyncHandler from 'express-async-handler';
import express from 'express';
import PostMessage from '../models/postMessage.js'
import Users from '../models/users.js'
const router = express.Router();

//this controller will send back all the post that the user likes based on the likes field on the user database
export const userLikes = (async (req, res) => {
    const { userID } = req.body

    try {
        const user = await Users.findOne({ "userID": userID })

        
        Promise.all(user.likes.map(pid => {
            return PostMessage.findById(pid).exec().catch(err => {
                return null;
            });
        })).then(foundPost => {
            foundPost = foundPost.filter(pid => pid !== null);
            
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

        const { userID } = req.body
        let liked = []
        try {
            const user = await Users.findOne({ "userID": userID })

            Promise.all(user.following.map(uid => {
                return Users.findOne({"userID" : uid}).select({"username" : 1 , "userID" : 2}).exec().catch(err => {
                    return null;
                });
                

            })).then(foundUser => {
                foundUser = foundUser.filter(uid => uid !== null);

                res.status(200).json(foundUser);
            }).catch(err => {
                res.status(404).json({ message: error.message });
            });


        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    })


export default router;
