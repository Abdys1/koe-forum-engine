import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import AuthenticationError from '#src/components/auth/AuthenticationError.js';
import httpLogger from '#src/components/logger/HttpLogger.js';
import logger from '#src/components/logger/Logger.js';
import { authMiddleware } from '#src/components/auth/index.js';

import apiRouter from '#src/routes/ApiRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(authMiddleware);

app.use('/api', apiRouter);

// TODO legyen külön fájl
app.use((err, _, res, next) => {
  logger.error(err);
  if (err instanceof AuthenticationError) {
    res.status(401).send();
  } else {
    next(err);
  }
});

export default app;
