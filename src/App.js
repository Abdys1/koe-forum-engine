import 'dotenv/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import AuthenticationError from '#src/auth/AuthenticationError.js';
import httpLogger from '#src/logger/HttpLogger.js';
import logger from '#src/logger/Logger.js';
import authRouter from '#src/routes/AuthRoutes.js';
import { authMiddleware } from '#src/auth/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(authMiddleware);

// TODO szervezzük ki egy külön fájlba a routes-okat és használjuk az api-t base url-ként,
// amire az összes többi routes-ot kötjük
const BASE_PATH = '/api';
app.use(`${BASE_PATH}/auth`, authRouter);

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
