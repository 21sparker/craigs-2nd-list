import { CommonRoutesConfig } from '../common/CommonRoutesConfig';
import { Application } from 'express';
import UserMiddleware from '../user/UserMiddleware';
import AuthController from './AuthController';
import AuthMiddleware from './AuthMiddleware';


export class AuthRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "AuthRoutes");
    }

    configureRoutes() {
        this.app.post('/login', 
            UserMiddleware.validateRequiredUserBodyFields,
            AuthMiddleware.validateEmailExists,
            AuthController.getJWTToken
        );

        return this.app;
    }
}