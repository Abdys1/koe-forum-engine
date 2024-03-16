import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import httpLogger from '@src/components/logger/http-logger';
import errorHandler from '@src/middlewares/error-handler.middleware';

import apiRouter from '@src/routes/api.routes';

const app = express();

app.use(cors()); // TODO FONTOS configoljuk
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);

app.use(errorHandler);

export default app;
