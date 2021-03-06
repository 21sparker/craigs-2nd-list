import { Request, Response } from 'express';
import { CrudController } from '../common/CrudController';
import PostService from './PostService';
import CategoryService from '../category/CategoryService';

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
        console.log("Request body: " + req.body);

        const data: any = {};
        data.title = req.body.title;
        data.description = req.body.description;
        data.city = req.body.city;
        data.state = req.body.state;
        data.price = req.body.price;
        data.user_id = req.user_id;
        data.subcategory_id = req.body.subcategory_id;
        data.category_id = 1; // For the goods category
        data.image_url = req.body.image_url;

        console.log("Post object data to be created: " + data);

        const good = await PostService.createGood(data);
        console.log("Good: " + good);
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
            loc as string | undefined, 
            uid as string | undefined);
        res.status(200).json(searchResults);
    }
}

export default PostController.getInstance();