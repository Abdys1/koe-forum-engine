import 'dotenv/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import AuthenticationError from './auth/AuthenticationError.js';

import authRouter from './routes/AuthRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

const BASE_PATH = '/api';
app.use(`${BASE_PATH}/auth`, authRouter);

app.use((err, req, res, next) => {
  // TODO log errors
  if (err instanceof AuthenticationError) {
    res.status(401).send({ error: 'message' });
  } else {
    next(err);
  }
});

export default app;
