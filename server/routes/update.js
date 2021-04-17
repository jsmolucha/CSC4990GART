import express from 'express';
import users from '../models/users.js'

const router = express.Router();

router.post('/updateForm', loadUpdate);
router.patch('/updateData', updateProfile)

export default router;

