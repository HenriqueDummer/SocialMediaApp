import express from 'express'
import { updateProfile, follow } from '../controllers/user.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()

router.post('/updateProfile', protectRoute, updateProfile)
router.post('/follow/:userId', protectRoute, follow)
export default router