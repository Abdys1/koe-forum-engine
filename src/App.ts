import 'dotenv/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import AuthenticationError from 'components/auth/AuthenticationError';
import httpLogger from 'components/logger/HttpLogger';
import logger from 'components/logger/Logger';
import { authMiddleware } from 'components/auth/index';

import apiRouter from 'routes/ApiRoutes';

const app = express();

app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(authMiddleware);

app.use('/api', apiRouter);

// TODO legyen külön fájl
app.use((err: any, req: any, res: any, next: any) => {
  logger.error(err);
  if (err instanceof AuthenticationError) {
    res.status(401).send();
  } else {
    next(err);
  }
});

export default app;
