import characterRouter from '@src/components/character/character.routes';
import equipmentRouter from '@src/components/equipment/equipment.routes';
import equipmentTypeRouter from '@src/components/equipment-type/equipment-type.routes';
import authRouter from '@src/routes/auth.routes';
import express from 'express';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/characters', characterRouter);
router.use('/equipment/type', equipmentTypeRouter);
router.use('/equipment', equipmentRouter);

export default router;
