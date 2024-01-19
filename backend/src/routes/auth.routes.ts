import express from 'express';
import { authController } from '@src/components/auth';

const router = express.Router();

router.post('/login', (req, res, next) => authController.login(req, res, next));

router.post('/refresh', (req, res, next) => authController.refresh(req, res, next));

router.post('/registrate', (req, res) => authController.registrate(req, res));

export default router;
