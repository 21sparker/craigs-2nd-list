import { CommonRoutesConfig } from '../common/CommonRoutesConfig';
import express, { Request, Response, NextFunction } from 'express';
import UserController from './UserController';
import UserMiddleware from './UserMiddleware';
import AuthMiddleware from '../auth/AuthMiddleware';

export class UserRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, "UserRoutes");
    }

    configureRoutes() {
        this.app.route('/users')
            .get(UserController.listUsers)
            .post(
                UserMiddleware.validateRequiredUserBodyFields,
                UserMiddleware.validateSameEmailDoesntExists,
                UserController.create
            );
        
        this.app.route('/users/:userId')
            .all(UserMiddleware.validateUserExists)
            .get(UserController.read)
            .delete(
                AuthMiddleware.getJWTTokenData,
                UserController.delete
            )
            .put((req: Request, res: Response) => {
                res.status(200).send(`PUT requested for id ${req.params.userId}`);
            })
            .patch(
                AuthMiddleware.getJWTTokenData,
                UserController.patch
            )
        
        return this.app;
    }
}
