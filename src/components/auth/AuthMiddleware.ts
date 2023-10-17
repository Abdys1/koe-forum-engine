import { Request, Response } from "express";
import { Secret } from "jsonwebtoken";

function useAuthMiddleware(verifyToken: (token: string, secretKey: Secret) => Promise<any>, publicPaths: Array<string>) {
  return async (req: Request, res: Response, next: Function) => {
    try {
      if (!publicPaths.includes(req.path)) {
        let token = req.headers['Authorization'] as string | null | undefined;
        if (!token) {
          throw new Error('Token is not found!');
        }
        token = token.split(' ')[1];
        const secret = process.env.ACCESS_TOKEN_SECRET || ''; // TODO kiemelni az env értékeket egy külön modulba
        await verifyToken(token, secret);
      }
      next();
    } catch (err) {
      res.status(403).send();
    }
  };
}

export default useAuthMiddleware;
