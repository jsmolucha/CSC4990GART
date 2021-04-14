//this file should contain all the controller funtions for the User collection(db table)
//that way we can implement a CRUD ready structure 

//create --> create user account (a version can be found in the routes folder)
//read --> displays user data; useful for login and for other
//update --> updates the user info; corralates with an 'account' page on the front end side (tba)
//delete user --->deletes user from collection permanantly; standard practice for all websites


import express from "express";
import mongoose from "mongoose";

import users from "../models/users.js";
import asyncHandler from "express-async-handler";

import formidable from "formidable";
const router = express.Router();

// update
export const UpdateProfile = async (req, res) => {
    const { userID } = req.params;
    try {

  
      res.status(200).json(postMessages);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };