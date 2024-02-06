import { useDefineRouter } from "@src/components/routerconf/router-config";
import useAuthMiddleware from "@src/middlewares/auth.middleware";
import { verifyToken } from "@src/components/auth/jwt-token-generator";
import config from "@src/config";

const authMiddleware = useAuthMiddleware({ verifyToken, secretKey: config.auth.secrets.accessToken });
const defineRouter = useDefineRouter(authMiddleware);

export { defineRouter };