import { TokenVerifierFunc } from '@src/components/auth/types';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validator';

export type AuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>

export interface AuthenticationMiddlewareOptions {
    verifyToken: TokenVerifierFunc, secretKey: string
};

export interface RestApiValidationErrors {
    errors: ValidationError[]
}