import { Request, Response } from 'express';
import { CrudController } from '../common/CrudController';
import PostService from './PostService';


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
        const data = req.body;
        data.user_id = req.user_id;
        data.category_id = 1; // For the goods category
        const good = await PostService.createGood(req.body);
        res.status(201).json(good);
    }

    public async read(req: Request, res: Response) {
        const goodId: string = req.params["goodId"];
        const good = await PostService.readGoodById(goodId);
        res.status(200).json(good);
    }

    public async patch(req: Request, res: Response) {
        const goodId: string = req.params["goodId"];
        const good = await PostService.patchGoodById(goodId, req.body);
        res.status(200).json(good);
    }

    public async delete(req: Request, res: Response) {
        const goodId: string = req.params["goodId"];
        await PostService.deleteGoodById(goodId, req.body);
        res.status(204).end();
    }

    public async search(req: Request, res: Response) {
        const { q, sc, loc, uid } = req.query;
        const searchResults = await PostService.search(
            q as string | undefined, 
            sc as string | string[] | undefined, 
            loc as string | string[] | undefined, 
            uid as string | undefined);
        res.status(200).json(searchResults);
    }
}

export default PostController.getInstance();