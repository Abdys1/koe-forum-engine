import { useDefineRouter } from "@src/components/routerconf/router-config";
import useAuthMiddleware from "@src/middlewares/auth.middleware";
import { verifyToken } from "@src/components/auth/jwt-token-generator";

const authMiddleware = useAuthMiddleware({ verifyToken, secretKey: "" });
const defineRouter = useDefineRouter(authMiddleware);

export { defineRouter };