import { Request, Response, NextFunction } from 'express';
import AuthController from '../auth/AuthController';
import AuthMiddleware from '../auth/AuthMiddleware';

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

    public async validateIfUserQuery(req: Request, res: Response, next: NextFunction) {
        if (req.query.uid) {
            await AuthMiddleware.validateJWTToken(req, res, next);
        } else {
            next();
        }
    }
}

export default PostMiddleware.getInstance();