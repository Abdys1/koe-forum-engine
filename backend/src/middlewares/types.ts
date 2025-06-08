import { ForumUser } from '@prisma/client';
import { TokenVerifierFunc } from '@src/components/auth/types';
import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validator';

export type AuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>

export interface AuthenticationMiddlewareOptions {
    verifyToken: TokenVerifierFunc, secretKey: string
    findUserByUsername: (username: string) => Promise<ForumUser>
};

export interface RestApiValidationErrors {
    errors: ValidationError[]
}