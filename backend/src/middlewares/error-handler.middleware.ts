import AuthenticationError from "@src/components/auth/authentication.error";
import logger from "@src/components/logger/logger";
import { NextFunction, Request, Response } from 'express';

import RestApiValidationError from "./rest-api-validation.error";

function errorHandler(err: unknown, _: Request, res: Response, next: NextFunction) {
  logger.error(err);
  if (err instanceof AuthenticationError) {
    res.status(401).send();
  } else if (err instanceof RestApiValidationError) {
    res.status(400).send(err.getErrors());
  } else {
    next(err);
  }
}

export default errorHandler;