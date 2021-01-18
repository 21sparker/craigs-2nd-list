import { Request, Response } from 'express';
import { ValidationError } from 'objection';
import { CrudController } from '../common/CrudController';
import User from './User';

class UserController extends CrudController {
    private static instance: UserController;

    public static getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    // Create a new user
    public async create(req: Request, res: Response) {
        let user;
        try {
            user = await User.query()
                    .modify('create', req.body);
        } catch (e) {
            // Note this check is also performed by a middleware, need to get rid of one
            if (e instanceof ValidationError) {
                res.status(400).send({error: 'Missing required fields email and password'});
            } else {
                res.status(400).send({error: 'Internal error occurred.'});
            }
        }

        if (user) {
            res.status(200).json(user);
        }
    }

    // Get a new user
    public async read(req: Request, res: Response) {
        const userId: string = req.params["userId"];
        const user = await User.query()
            .modify('searchById', userId);
        
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({error: 'User not found'});
        }
    }

    // Update a new user
    public async patch(req: Request, res: Response) {
        const userId: string = req.params["userId"];
        const user = await User.query()
            .modify('patchById', userId, req.body)
        
        if (user) {
            res.status(200).json(user); 
        } else {
            res.status(404).json({error: 'User not found'});
        }

        res.status(200).json(user);
    }

    // Delete a user
    public async delete(req: Request, res: Response) {
        const userId: string = req.params["userId"];
        const numOfDeletedUsers = await User.query().deleteById(userId);

        if (numOfDeletedUsers === 1) {
            res.status(200).end();
        } else {
            res.status(404).json({error: 'User not found'});
        }
    }

    // List all users
    public async list(req: Request, res: Response) {
        const users: Array<User> = await User.query().select();
        res.status(200).json(users);
    }
}

export default UserController.getInstance();