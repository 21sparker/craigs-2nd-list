import { CommonRoutesConfig } from '../common/CommonRoutesConfig';
import { Application, Request, Response, NextFunction } from 'express';
import CategoryController from './CategoryController';


export class CategoryRoutes extends CommonRoutesConfig {
    
    constructor(app: Application) {
        super(app, "CategoryRoutes");
    }

    configureRoutes() {
        this.app.get('/categories', CategoryController.listCategories);

        return this.app;
    }
}