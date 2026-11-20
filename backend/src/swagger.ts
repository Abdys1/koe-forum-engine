import swaggerJSDoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'KOE Forum Engine API',
            version: '1.0.0',
        },
        servers: [
            { url: '/api' },
        ],
        components: {
            schemas: {
                ErrorCode: {
                    type: 'object',
                    required: ['errorCode'],
                    properties: {
                        errorCode: { type: 'string' },
                    },
                },
                ValidationErrors: {
                    type: 'object',
                    required: ['errors'],
                    properties: {
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['type', 'msg'],
                                properties: {
                                    type: { type: 'string' },
                                    msg: { type: 'string' },
                                    path: { type: 'string' },
                                    location: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/components/**/*.routes.ts', './src/routes/*.routes.ts'],
});

export default swaggerSpec;
