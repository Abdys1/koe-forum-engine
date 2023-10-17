import express from 'express';
import authRouter from 'routes/AuthRoutes';

const router = express.Router();

router.use('/auth', authRouter);

export default router;
