import express from 'express';
import users from '../models/users.js'

const router = express.Router();

router.update('/update', auth, updateUser);

export default router;

