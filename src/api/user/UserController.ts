import { Request, Response } from 'express';
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
        const userId: string = req.params["userId"];
        const user: User = await User.query()
            .insert(req.body)
            .returning('*') // Unique postgres callback that returns the new user
        
        res.status(200).json(user)
    }

    // Get a new user
    public async read(req: Request, res: Response) {
        const userId: string = req.params["userId"];
        const user: User = await User.query()
            .findById(parseInt(userId));
        
        if (user == undefined) {
            res.status(404).json({});
        } else {
            res.json(user);
        }
    }

    // Update a new user
    public async update(req: Request, res: Response) {
        const userId: string = req.params["userId"];
        const user = await User.query()
            .patch(req.body)
            .where(User.idColumn, userId)
            .returning('*')
            .first();
        
        res.status(200).json(user);
    }

    // Delete a user
    public async delete(req: Request, res: Response) {
        const userId: string = req.params["userId"];
        const numOfDeletedUsers = await User.query().deleteById(userId);

        if (numOfDeletedUsers === 0) {
            res.status(204).end();
        } else {
            res.status(200).end();
        }
    }

    // List all users
    public async list(req: Request, res: Response) {
        const users: Array<User> = await User.query().select();
        res.status(200).json(users);
    }
}

export default UserController.getInstance();