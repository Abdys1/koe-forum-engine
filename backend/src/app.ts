import httpLogger from '@src/components/logger/http-logger';
import errorHandler from '@src/middlewares/error-handler.middleware';
import apiRouter from '@src/routes/api.routes';
import swaggerSpec from '@src/swagger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

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

app.use('/.data/uploads', express.static('.data/uploads'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', apiRouter);

app.use(errorHandler);

export default app;
