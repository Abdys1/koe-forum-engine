import AuthenticationError from "@src/components/auth/authentication.error";
import logger from "@src/components/logger/logger";
import { AuthenticationMiddleware, AuthenticationMiddlewareOptions } from "@src/middlewares/types";
import { NextFunction, Request, Response } from "express";

function useAuthMiddleware(options: AuthenticationMiddlewareOptions): AuthenticationMiddleware {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bearerToken = (req.header('Authorization') as string).split(' ');
      if (bearerToken.length != 2) {
        throw new AuthenticationError('Token is not found!');
      }
      const token = await options.verifyToken(bearerToken[1], options.secretKey);
      const user = await options.findUserByUsername(token.username);
      logger.debug(user);
      req.user = { id: user.id, username: user.username };
      next();
    } catch (err) {
      logger.error(err);
      res.status(403).send();
    }
  };
}

export default useAuthMiddleware;
