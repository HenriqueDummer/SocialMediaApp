import express from 'express';

import { getMe, logout, signin, signup, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post("/sign-in", signin);
router.post("/sign-up", signup)
router.get("/me", protectRoute, getMe);
router.get("/logout", protectRoute, logout)
router.post("/profile/update", protectRoute, updateProfile)

export default router;