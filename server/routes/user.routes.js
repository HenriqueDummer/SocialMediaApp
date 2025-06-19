import express from 'express'
import { updateProfile, follow, searchForUsers, searchAll, whoToFollow, following, getUserProfile } from '../controllers/user.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()

router.get('/who_to_follow', protectRoute, whoToFollow)
router.get('/following', protectRoute, following)
router.get('/profile/:userId', protectRoute, getUserProfile)
router.get('/search/users/:query', protectRoute, searchForUsers)
router.get('/search/:query', protectRoute, searchAll)

router.post('/profile/update', protectRoute, updateProfile)
router.post('/follow/:userId', protectRoute, follow)

export default router