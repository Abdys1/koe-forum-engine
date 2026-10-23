import { verifyToken } from '@src/components/auth/jwt-token-generator';
import { characterRoutes } from '@src/components/character/character.routes';
import { equipmentRoutes } from '@src/components/equipment/equipment.routes';
import { equipmentTypeRoutes } from '@src/components/equipment-type/equipment-type.routes';
import { useDefineRouter } from '@src/components/routerconf/router-config';
import { slotRoutes } from '@src/components/slot/slot.routes';
import config from '@src/config';
import { Cradle } from '@src/container';
import useAuthMiddleware from '@src/middlewares/auth.middleware';
import { authRoutes } from '@src/routes/auth.routes';
import express from 'express';

export const createApiRouter = (cradle: Cradle) => {
    const defineRouter = useDefineRouter(useAuthMiddleware({
        verifyToken,
        findUserByUsername: (username: string) => cradle.userDao.findByUsername(username),
        secretKey: config.auth.secrets.accessToken
    }));

    const router = express.Router();

    router.use('/auth', defineRouter(authRoutes(cradle)));
    router.use('/characters', defineRouter(characterRoutes(cradle)));
    router.use('/equipment/type', defineRouter(equipmentTypeRoutes(cradle)));
    router.use('/equipment/slot', defineRouter(slotRoutes(cradle)));
    router.use('/equipment', defineRouter(equipmentRoutes(cradle)));

    return router;
};
