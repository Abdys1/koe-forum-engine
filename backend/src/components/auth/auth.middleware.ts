import { AuthenticationMiddleware, TokenVerifierFunc } from "@src/components/auth/types";
import { NextFunction, Request, Response } from "express";
import logger from "@src/components/logger/logger";
import AuthenticationError from "./authentication.error";

// TODO a configot adjuk át neki és úgy teszteljük mert most emiatt nem jók a tesztek
function useAuthMiddleware(verifyToken: TokenVerifierFunc, publicPaths: Array<string>, secretKey: string): AuthenticationMiddleware {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!publicPaths.includes(req.path)) {
        const bearerToken = (req.headers['Authorization'] as string).split(' ');
        if (bearerToken.length != 2) {
          throw new AuthenticationError('Token is not found!');
        }
        await verifyToken(bearerToken[1], secretKey);
      }
      next();
    } catch (err) {
      logger.error(err);
      res.status(403).send();
    }
  };
}

export default useAuthMiddleware;
