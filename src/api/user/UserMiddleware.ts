import { Request, Response, NextFunction } from 'express';
import User from './User';
import UserService from './UserService';


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
        console.log("required user body fields check")
        if (req.body && req.body.email && req.body.password) {
            console.log("completed validation")
            next();
        } else {
            res.status(400).send({error: 'Missing required fields email and password'});
        }
    }

    // Validate that the email isn't already being used
    public async validateSameEmailDoesntExists(req: Request, res: Response, next: NextFunction) {
        console.log("validate same email doesn't exist")
        const user = await UserService.getUserByEmail(req.body.email);
        if (user) {
            console.log('completed')
            res.status(400).send({error: 'User email already exists'});
        } else {
            next();
        }
    }

    public async validateUserExists(req: Request, res: Response, next: NextFunction) {
        const user = await UserService.readById(req.params.userId);
        if (user) {
            next();
        } else {
            res.status(404).json({error: `User ${req.params.userId} not found`});
        }
    }


    

}

export default UserMiddleware.getInstance();