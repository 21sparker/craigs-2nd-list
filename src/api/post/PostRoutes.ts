import { CommonRoutesConfig } from '../common/CommonRoutesConfig';
import { Application } from 'express';
import PostMiddleware from './PostMiddleware';

export class PostRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "AuthRoutes");
    }

    configureRoutes() {
        this.app.route('/goods')
            .get(
                PostMiddleware.validateQuery
            )
        return this.app;
    }
}