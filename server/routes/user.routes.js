import express from 'express'
import { updateProfile, follow, searchForUsers, searchAll, mostFollowed } from '../controllers/user.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'
import { getUserProfile } from '../controllers/posts.controller.js'

const router = express.Router()

router.get('/who_to_follow', protectRoute, mostFollowed)
router.post('/profile/update', protectRoute, updateProfile)
router.post('/follow/:userId', protectRoute, follow)
router.get('/profile/:username', protectRoute, getUserProfile)
router.get('/search/users/:query', protectRoute, searchForUsers)
router.get('/search/:query', protectRoute, searchAll)
export default router