import { CommonRoutesConfig } from '../common/CommonRoutesConfig';
import { Application } from 'express';
import PostMiddleware from './PostMiddleware';
import PostController from './PostController';
import AuthMiddleware from '../auth/AuthMiddleware';

export class PostRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "PostRoutes");
    }

    configureRoutes() {
        this.app.route('/goods')
            .get(
                PostMiddleware.validateQuery,
                PostController.search
            )
            .post(
                AuthMiddleware.getJWTTokenData,
                PostMiddleware.validateRequiredUserBodyFields,
                PostController.create
            )
        this.app.route('/goods/:goodId')
            .get(PostController.read)
            .patch(
                AuthMiddleware.getJWTTokenData,
                PostMiddleware.validatePostExists,
                PostMiddleware.validateUserOwnsPost,
                PostController.patch
            )
            .delete(
                AuthMiddleware.getJWTTokenData,
                PostMiddleware.validatePostExists,
                PostMiddleware.validateUserOwnsPost,
                PostController.delete
            )

        return this.app;
    }
}