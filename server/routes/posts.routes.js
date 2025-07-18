import express from 'express';
import { getPosts, createPost, likePost, getPostById, postReply, likeReply, editPost, repostPost, deletePost } from '../controllers/posts.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/:filter', protectRoute, getPosts);
router.get('/post/:postId', protectRoute, getPostById);

router.post('/', protectRoute, createPost);
router.post('/like/:postId', protectRoute, likePost);
router.post('/reply/like/:postId', protectRoute, likeReply)
router.post('/reply/:postId', protectRoute, postReply)
router.post('/repost/:postId', protectRoute, repostPost)

router.delete('/delete/:postId', protectRoute, deletePost)

router.put('/edit/:postId', protectRoute, editPost)

export default router;