import { Request, Response } from 'express';
import { CrudController } from './CrudController';
import { User } from '../models';

export class UserController extends CrudController {
    public create(req: Request, res: Response) {
        throw new Error("Method not implemented");
    }
    public async read(req: Request, res: Response) {
        const userId: string = req.params["userId"];
        const user: User = await User.query().findById(parseInt(userId));
        res.json(user);
    }
    public update(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
    public delete(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
}