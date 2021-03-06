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
        console.log("Validating post exists");
        const post = await PostService.readGoodById(req.params["goodId"]);
        console.log("Post found: " + post);
        if (!post) {
            console.log("Post not found");
            res.status(404).json({error: `Post ${req.body.post_id} not found`})
        } else {
            console.log("Post found");
            next();
        }
    }

    public async validateUserOwnsPost(req: Request, res: Response, next: NextFunction) {
        console.log("Validating user owns post");
        const post = await PostService.readGoodById(req.params["goodId"]);
        console.log("Post found: " + post);
        if (req.user_id !== post.user_id) {
            console.log("Post not owned by user. req.user_id: " + req.user_id + " post.user_id: " + post.user_id);
            res.status(403).json({error: 'User is not permitted to update this post'});
        } else {
            console.log("Post owned by user");
            next();
        }
    }

    public async validateRequiredUserBodyFields(req: Request, res: Response, next: NextFunction) {
        if (req.body &&
            req.body.title &&
            req.body.description &&
            req.body.city &&
            req.body.state &&
            // req.body.location &&
            req.body.price &&
            req.body.subcategory_id) {
                console.log("Validated fields");
                next();
            } else {
                console.log("Fields are not valid: ", req.body);
                res.status(400).send({error: 'Missing at least one of the following fields: title, description, city, state, price, subcategory_id'});
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