import express from 'express';
import { getPosts, createPost, likePost, getUserProfile, getPostById, postReply, likeReply, editPost, repostPost } from '../controllers/posts.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/', protectRoute, getPosts);
router.get('/:postId', protectRoute, getPostById);
router.get('/user/:username', protectRoute, getUserProfile);
router.post('/', protectRoute, createPost);

router.post('/like/:postId', protectRoute, likePost);
router.post('/reply/like/:postId', protectRoute, likeReply)
router.post('/reply/:postId', protectRoute, postReply)
router.post('/repost/:postId', protectRoute, repostPost)

router.put('/edit/:postId', protectRoute, editPost)

export default router;