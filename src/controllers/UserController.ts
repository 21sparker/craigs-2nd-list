import { Request, Response } from 'express';
import { CrudController } from './CrudController';

export class UserController extends CrudController {
    public create(req: Request, res: Response) {
        throw new Error("Method not implemented");
    }
    public read(req: Request, res: Response) {
        const userId: string = req.params["userId"];
        res.json({ message: `Looking for user ${userId} huh!?` });
    }
    public update(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
    public delete(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
}