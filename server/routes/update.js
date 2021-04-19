import express from 'express';
import users from '../models/users.js'
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.route('/users/edit').post((req,res) => {
});

router.route('/users/edit/done').post((req,res) => {

});
export default router;

