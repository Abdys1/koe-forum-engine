import express from 'express';
import { authController } from '#src/components/auth/index.js';

const router = express.Router();

router.post('/login', (req, res, next) => authController.login(req, res, next));

router.post('/refresh', (req, res, next) => authController.refresh(req, res, next));

export default router;
