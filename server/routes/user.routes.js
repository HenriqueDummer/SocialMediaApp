import express from 'express'
import { updateProfile, follow } from '../controllers/user.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'
import { getUserProfile } from '../controllers/posts.controller.js'

const router = express.Router()

router.post('/profile/update', protectRoute, updateProfile)
router.post('/follow/:userId', protectRoute, follow)
router.get('/profile/:username', protectRoute, getUserProfile)
export default router