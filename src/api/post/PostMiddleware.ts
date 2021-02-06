import { Request, Response, NextFunction } from 'express';
import AuthController from '../auth/AuthController';
import AuthMiddleware from '../auth/AuthMiddleware';
import PostService from './PostService';

export class PostMiddleware {
    private static instance: PostMiddleware;

    static getInstance() {
        if (!PostMiddleware.instance) {
            PostMiddleware.instance = new PostMiddleware();
        }
        return PostMiddleware.instance;
    }

    public async validateQuery(req: Request, res: Response, next: NextFunction) {
        console.log(req.query.k);
        next();
    }

    public async validatePostExists(req: Request, res: Response, next: NextFunction) {
        const post = await PostService.readGoodById(req.params["goodId"]);

        if (!post) {
            res.status(404).json({error: `Post ${req.body.post_id} not found`})
        } else {
            next();
        }
    }

    public async validateUserOwnsPost(req: Request, res: Response, next: NextFunction) {
        const post = await PostService.readGoodById(req.params["goodId"]);

        if (req.user_id !== post.user_id) {
            res.status(403).json({error: 'User is not permitted to update this post'});
        } else {
            next();
        }
    }

    public async validatePatchUpdates(req: Request, res: Response, next: NextFunction) {
        const fieldsToUpdate: string[] = req.body.keys();

        if (fieldsToUpdate.includes("post_id") ||
            fieldsToUpdate.includes("created_at") ||
            fieldsToUpdate.includes("updated_at") ||
            fieldsToUpdate.includes("user_id") ||
            fieldsToUpdate.includes("category_id")) {
                res.status(400).json({error: `The following fields are not permitted to be updated: post_id, created_at, updated_at, user_id, category_id`});
        } else {
            next();
        }
    }
}

export default PostMiddleware.getInstance();