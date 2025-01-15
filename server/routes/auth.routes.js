import express from 'express';

import { signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/sign-in", signin);
router.post("/sign-up", signup)

export default router;