import { CommonRoutesConfig } from '../common/CommonRoutesConfig';
import express, { Request, Response, NextFunction } from 'express';
import { UserController } from './UserController';

const userController: UserController = new UserController();

export class UserRoutes extends CommonRoutesConfig {

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
            .all([
                
            ])
            .get([
                userController.read,
            ])
            .put((req: Request, res: Response) => {
                res.status(200).send(`PUT requested for id ${req.params.userId}`);
            })
            .patch([
                userController.update,
            ])
            .delete([
                userController.delete,
            ]);
        
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

