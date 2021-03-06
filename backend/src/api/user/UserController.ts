import { Request, Response } from 'express';
import { CrudController } from '../common/CrudController';
import UserService from './UserService';
import bcrypt from 'bcrypt';
import { AuthConfig } from '../../config';

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
        // Update password to its hashed version
        console.log("create user")
        req.body.password = await bcrypt.hash(req.body.password, AuthConfig.saltRounds);
        const user = await UserService.create(req.body);
        console.log("completed")
        res.status(201).json(user);
    }

    // Read user
    public async read(req: Request, res: Response) {
        const userId: string = req.params["userId"];
        const user = await UserService.readById(userId);
        res.status(200).json(user);
    }

    // Update a new user
    public async patch(req: Request, res: Response) {
        const userId: string = req.params["userId"];
        const user = await UserService.patchById(userId, req.body); 
        res.status(200).json(user); 
    }

    // Delete a user
    public async delete(req: Request, res: Response) {
        const userId: string = req.params["userId"];
        await UserService.deleteById(userId);
        res.status(204).end();
    }

    // List all users
    public async listUsers(req: Request, res: Response) {
        const users = await UserService.listAll();
        res.status(200).json(users);
    }
}

export default UserController.getInstance();