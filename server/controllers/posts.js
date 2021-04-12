/**  (WIP)
 * Controllers
 * A controller can be defined as the entity that will be responsible for manipulating models
 * and initiating the view render process with the data received from the corresponding models.
 *
 * This is built to handle our post ie Fan Art
 *
 * basically DB --> Model --> controller
 */

import express from "express";
import mongoose from "mongoose";
import aws from 'aws-sdk'
import PostMessage from "../models/postMessage.js";
import asyncHandler from "express-async-handler";

import formidable from "formidable";
const router = express.Router();

// import { upload } from "../utils/upload.js";
// const singleUpload = upload.single("image");

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const post = await PostMessage.findById(id);
    console.log(post)
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

import { upload } from "../utils/upload.js";
const singleUpload = upload.single("file");
// const formInput = upload.single("data");
export const createPost = asyncHandler(async (req, res) => {
  await singleUpload(req, res, async function (err) {
    if (err) {
      return res
        .status(422)
        .send({
          errors: [{ title: "Image Upload Error", detail: err.message }],
        });
    }
    const postData = req.body;
    console.log(postData);
    const newPostMessage = new PostMessage({
      ...postData,
      // creator: req.userID,
      createdAt: new Date().toISOString(),
      filePath: req.file.location,
    });

    try {
      await newPostMessage.save();
      console.log(newPostMessage);
      res.status(201).json(newPostMessage);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  });
});






aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  // signatureVersion: "v4",
  region: "us-east-2",
});

const s3 = new aws.S3();
var bucketParams = {
  Bucket : 'gartimagebucket2021'
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, filePath, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, description, tags, filePath, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};



export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userID) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userID));

  if (index === -1) {
    post.likes.push(req.userID);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userID));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export default router;
