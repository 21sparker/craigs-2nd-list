import { CommonRoutesConfig } from '../common/CommonRoutesConfig';
import express, { Request, Response, NextFunction } from 'express';
import UserController from './UserController';

export class UserRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, "UserRoutes");
    }

    configureRoutes() {
        this.app.route('/users')
            .get(UserController.list)
            .post(
                UserController.create,
            );
        
        this.app.route('/users/:userId')
            .all([
                
            ])
            .get([
                UserController.read,
            ])
            .put((req: Request, res: Response) => {
                res.status(200).send(`PUT requested for id ${req.params.userId}`);
            })
            .patch([
                UserController.patch,
            ])
            .delete([
                UserController.delete,
            ]);
        
        return this.app;
    }
}

// FOLLOW THIS: 
// https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1


// import express, { Request, Response, Router } from 'express';
// import { UserController } from '../controllers';

// export const router = Router({ strict: true });

// router.post('/', async (req: Request, res: Response) => {
//     await UserController.create(req, res);
// });
// router.get('/:userId', async (req: Request, res: Response) => {
//     await UserController.read(req, res);
// });
// router.patch('/:userId', (req: Request, res: Response) => {
//     UserController.update(req, res);
// });
// router.delete('/:userId', (req: Request, res: Response) => {
//     UserController.delete(req, res);
// });

