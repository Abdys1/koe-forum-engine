import httpLogger from '@src/components/logger/http-logger';
import errorHandler from '@src/middlewares/error-handler.middleware';
import apiRouter from '@src/routes/api.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

const app = express();

declare module 'express-serve-static-core' {
    export interface Request {
        user: { id: number, username: string };
    }
}

app.use(cors()); // TODO FONTOS configoljuk
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);

app.use(errorHandler);

export default app;
