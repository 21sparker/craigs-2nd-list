import { CommonRoutesConfig } from '../common/CommonRoutesConfig';
import { Application } from 'express';

export class PostRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app, "AuthRoutes");
    }

    configureRoutes() {
        return this.app;
    }
}