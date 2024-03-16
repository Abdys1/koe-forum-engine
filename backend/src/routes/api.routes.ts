import express from 'express';
import authRouter from '@src/routes/auth.routes';
import characterRouter from '@src/routes/character.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/characters', characterRouter);

export default router;
