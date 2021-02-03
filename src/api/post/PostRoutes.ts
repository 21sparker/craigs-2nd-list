import { CommonRoutesConfig } from '../common/CommonRoutesConfig';
import { Application } from 'express';
import PostMiddleware from './PostMiddleware';
import PostController from './PostController';

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
        //     .post(
        //         PostController.create
        //     )
        this.app.route('/goods/:goodId')
            .get(PostController.read)

        return this.app;
    }
}