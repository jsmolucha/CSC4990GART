/** (WIP)
 * CRUD routes for Posts
 * 
 * 
 */
import express from 'express';

import { getPosts, getPost, createPost, updatePost, likePost, deletePost, addComment, deleteComment } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";
import authenticate from "./token_verification.js"

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/addComment', auth, addComment)
router.delete('/deleteComment/:id', auth, deleteComment);

export default router;