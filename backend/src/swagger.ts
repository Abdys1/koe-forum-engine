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
