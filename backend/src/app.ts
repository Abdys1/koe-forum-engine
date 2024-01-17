import cookieParser from 'cookie-parser';
import express from 'express';
import AuthenticationError from '#src/components/auth/authentication.error';
import { authMiddleware } from '#src/components/auth';
import httpLogger from '#src/components/logger/http-logger';
import logger from '#src/components/logger/logger';

import apiRouter from '#src/routes/api.routes';

const app = express();

app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);

app.use('/api', apiRouter);

// TODO legyen külön fájl
app.use((err: any, _: any, res: any, next: any) => {
  logger.error(err);
  if (err instanceof AuthenticationError) {
    res.status(401).send();
  } else {
    next(err);
  }
});

export default app;
