import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import AuthenticationError from '#src/components/auth/authentication.error.js';
import { authMiddleware } from '#src/components/auth/index.js';
import httpLogger from '#src/components/logger/http-logger.js';
import logger from '#src/components/logger/logger.js';

import apiRouter from '#src/routes/api.routes.js';

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
