import { Request, Response } from 'express';
import { CrudController } from '../common/CrudController';


class PostController extends CrudController {
    private static instance: PostController;

    public static getInstance(): PostController {
        if (!PostController.instance) {
            PostController.instance = new PostController();
        }
        return PostController.instance;
    }

    // Create new post
    public async create(req: Request, res:Response) {
        res.status(200).end();
    }

    public async read(req: Request, res: Response) {
        res.status(200).end();
    }

    public async patch(req: Request, res: Response) {
        res.status(200).end();
    }

    public async delete(req: Request, res: Response) {
        res.status(200).end();
    }
}