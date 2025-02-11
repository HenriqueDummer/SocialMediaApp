import express from 'express';
import { getPosts, createPost, likePost } from '../controllers/posts.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/', protectRoute, getPosts);
router.post('/', protectRoute, createPost);
router.post('/:postId/like', protectRoute, likePost);

export default router;