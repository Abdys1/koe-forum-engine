import express from 'express';
import { authController } from '../auth/index.js';

const router = express.Router();

router.post('/login', (req, res, next) => authController.login(req, res, next));

export default router;
