import { CommonRoutesConfig } from './CommonRoutesConfig';
import express, { Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/UserController';
import { CrudController } from '../controllers/CrudController';
import { userController } from '../controllers';

export class UserRoutes extends CommonRoutesConfig {
    userController: CrudController = new UserController();

    constructor(app: express.Application) {
        super(app, "UserRoutes");
    }

    configureRoutes() {
        this.app.route('/users')
            .get([
                userController.list,
            ])
            .post([
                userController.create,
            ]);
        
        this.app.route('/users/:userId')
            .all([])
            // .all((req: Request, res: Response, next: NextFunction) => {
            //     // this middleware function runs before any request to /users/:userId
            //     // can do things like authenticate
            //     next();
            // })
            .get([
                userController.read,
            ])
            .put((req: Request, res: Response) => {
                res.status(200).send(`PUT requested for id ${req.params.userId}`);
            })
            .patch([
                userController.update,
            ])
            .delete((req: Request, res: Response) => {
                res.status(200).send(`DELETE requested for id ${req.params.userId}`);
            });
        
        return this.app;
    }
}

// FOLLOW THIS: 
// https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1


// import express, { Request, Response, Router } from 'express';
// import { userController } from '../controllers';

// export const router = Router({ strict: true });

// router.post('/', async (req: Request, res: Response) => {
//     await userController.create(req, res);
// });
// router.get('/:userId', async (req: Request, res: Response) => {
//     await userController.read(req, res);
// });
// router.patch('/:userId', (req: Request, res: Response) => {
//     userController.update(req, res);
// });
// router.delete('/:userId', (req: Request, res: Response) => {
//     userController.delete(req, res);
// });

