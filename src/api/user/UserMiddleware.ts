import { Request, Response, NextFunction } from 'express';
import User from './User';


class UserMiddleware {
    private static instance: UserMiddleware;

    static getInstance() {
        if (!UserMiddleware.instance) {
            UserMiddleware.instance = new UserMiddleware();
        }
        return UserMiddleware.instance;
    }

    // Validate that the request body includes an email and password
    public async validateRequiredUserBodyFields(req: Request, res: Response, next: NextFunction) {
        if (req.body && req.body.email && req.body.password) {
            next();
        } else {
            res.status(400).send({error: 'Missing required fields email and password'});
        }
    }

    public async validateSameEmailDoesntExists(req: Request, res: Response, next: NextFunction) {
        const user = await User.query()
                        .modify('searchByEmail', req.body.email);
        if (user) {
            res.status(400).send({error: 'User email already exists'});
        } else {
            next();
        }
    }

    public async validateUserExists(req: Request, res: Response, next: NextFunction) {
        const user = await User.query()
    
    }

    

}