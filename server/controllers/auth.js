//this file should contain all the controller funtions for the User collection(db table)
//that way we can implement a CRUD ready structure 

//create --> create user account (a version can be found in the routes folder)
//read --> displays user data; useful for login and for other
//update --> updates the user info; corralates with an 'account' page on the front end side (tba)
//delete user --->deletes user from collection permanantly; standard practice for all websites

import express from "express";
import User from "../models/users.js"
import asyncHandler from "express-async-handler";
const router = express.Router();

export const followUser = asyncHandler(async (req, res) => {
    const { username } = req.params; //Leader userId
    if (!req.userID) {
      return res.json({ message: "Unauthenticated" });
    }

    const leader = await User.findOne({"username" : username});
    const id = leader.userID
    const follower = await User.findOne({"userID" : req.userID})

    const index = leader.followers.findIndex((uid) => uid === String(req.userID));
  
    if (index === -1) {
      leader.followers.push(req.userID);
      follower.following.push(id)
    } else {
      leader.followers = leader.followers.filter((id) => id !== String(req.userID));
      follower.following = follower.following.filter((LID) => LID !== String(id));
    }
    const updatedLeader = await User.findByIdAndUpdate(leader._id, leader, {
      new: true,
    });
    const updatedFollower = await User.findByIdAndUpdate(follower._id, follower, {
      new: true,
    });
    res.status(200).json({updatedLeader, updatedFollower});
  })
  
  export default router;
  
