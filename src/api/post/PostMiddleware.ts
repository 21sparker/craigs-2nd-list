import { Request, Response, NextFunction } from 'express';

export class PostMiddleware {
    private static instance: PostMiddleware;

    static getInstance() {
        if (!PostMiddleware.instance) {
            PostMiddleware.instance = new PostMiddleware();
        }
        return PostMiddleware.instance;
    }

    public async validateQuery(req: Request, res: Response, next: NextFunction) {
        next();
    }
}

export default PostMiddleware.getInstance();