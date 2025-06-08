import { verifyToken } from "@src/components/auth/jwt-token-generator";
import { useDefineRouter } from "@src/components/routerconf/router-config";
import { userDao } from "@src/components/user";
import config from "@src/config";
import useAuthMiddleware from "@src/middlewares/auth.middleware";

const authMiddleware = useAuthMiddleware({
    verifyToken,
    findUserByUsername: (username: string) => userDao.findByUsername(username),
    secretKey: config.auth.secrets.accessToken
});
const defineRouter = useDefineRouter(authMiddleware);

export { defineRouter };