import express from 'express';
import { getPosts, createPost } from '../controllers/posts.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/', protectRoute, getPosts);
router.post('/', protectRoute, createPost);

export default router;