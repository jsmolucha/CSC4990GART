import express from 'express';
import users from '../models/users.js'
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/users/edit', async (req, res) => {
    console.log("this route is working?")
});

router.post('/users/edit/done', async (req, res) => {
    console.log("this route is working?")
});

export default router;

