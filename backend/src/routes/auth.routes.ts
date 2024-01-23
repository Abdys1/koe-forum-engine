import { authController } from '@src/components/auth';
import { defineRouter } from '@src/components/routerconf';
import { HttpMethod } from '@src/components/routerconf/router-config';

export default defineRouter([
    { 
        path: '/login', 
        method: HttpMethod.POST, 
        controller: (req, res, next) => authController.login(req, res, next),
        public: true
    },
    { 
        path: '/refresh', 
        method: HttpMethod.POST, 
        controller: (req, res, next) => authController.refresh(req, res, next), 
        public: true 
    },
    { 
        path: '/registrate', 
        method: HttpMethod.POST, 
        controller: (req, res, next) => authController.registrate(req, res, next), 
        public: true 
    }
]);
