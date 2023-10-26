import express from 'express';
import authRouter from '#src/routes/AuthRoutes.js';

const router = express.Router();

router.use('/auth', authRouter);

export default router;
