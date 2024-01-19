import express from 'express';
import authRouter from '@src/routes/auth.routes';

const router = express.Router();

router.use('/auth', authRouter);

export default router;
