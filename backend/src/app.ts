import httpLogger from '@src/components/logger/http-logger';
import { LOCAL_UPLOADS_PUBLIC_PATH } from '@src/components/storage/storage.module';
import config from '@src/config';
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

    app.use(LOCAL_UPLOADS_PUBLIC_PATH, express.static(config.storage.local.uploadsDir));

    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api', createApiRouter(container.cradle));

    app.use(errorHandler);

    return app;
};
