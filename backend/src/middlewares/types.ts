import { TokenVerifierFunc } from '@src/components/auth/types';
import { Request, Response, NextFunction } from 'express';

export type AuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>

export type AuthenticationMiddlewareOptions = { verifyToken: TokenVerifierFunc, secretKey: string };