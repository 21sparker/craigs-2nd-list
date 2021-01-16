import { Request, Response } from 'express';
import { CrudController } from './CrudController';
import { User } from '../models';

export class UserController extends CrudController {
    public async create(req: Request, res: Response) {
        const userId: string = req.params["userId"];
        const user: User = await User.query().insert(req.body)
        // res.json(user);
    }
    public async read(req: Request, res: Response) {
        const userId: string = req.params["userId"];
        const user: User = await User.query().findById(parseInt(userId));
        if (user == undefined) {
            res.json({ message: "User not found." })
        } else {
            res.json(user);
        }
    }
    public async update(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
    public delete(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
}