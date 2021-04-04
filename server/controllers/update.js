import express from "express";
import mongoose from "mongoose";

import users from "../models/users.js";
import asyncHandler from "express-async-handler";

import formidable from "formidable";
const router = express.Router();


export const UpdateProfile = async (req, res) => {
    const { userID } = req.params;
    try {

  
      res.status(200).json(postMessages);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };