import httpLogger from '@src/components/logger/http-logger';
import { AppContainer } from '@src/container';
import errorHandler from '@src/middlewares/error-handler.middleware';
import { createApiRouter } from '@src/routes/api.routes';
import swaggerSpec from '@src/swagger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

declare module 'express-serve-static-core' {
    export interface Request {
        user: { id: number, username: string };
    }
}

export const createApp = (container: AppContainer) => {
    const app = express();

    app.use(cors()); // TODO FONTOS configoljuk
    app.use(httpLogger);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use('/.data/uploads', express.static('.data/uploads'));

    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api', createApiRouter(container.cradle));

    app.use(errorHandler);

    return app;
};
