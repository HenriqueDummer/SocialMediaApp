import express from 'express';
import { getPosts, createPost, likePost, getUserProfile, getPostById, postReply, likeReply } from '../controllers/posts.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/', protectRoute, getPosts);
router.post('/', protectRoute, createPost);
router.get('/:postId', protectRoute, getPostById);
router.post('/:postId/like', protectRoute, likePost);
router.get('/user/:username', protectRoute, getUserProfile);
router.post('/reply/like/:postId', protectRoute, likeReply)
router.post('/reply/:postId', protectRoute, postReply)
export default router;