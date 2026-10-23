import AuthController from "@src/components/auth/auth.controller";
import AuthServiceImpl from "@src/components/auth/auth.service";
import * as tokenGenerator from "@src/components/auth/jwt-token-generator";
import argon2 from "argon2";
import { asClass, asValue } from "awilix";

export const authModule = {
    pwdHasher: asValue(argon2),
    tokenGenerator: asValue(tokenGenerator),
    authService: asClass(AuthServiceImpl).singleton(),
    authController: asClass(AuthController).singleton(),
};
