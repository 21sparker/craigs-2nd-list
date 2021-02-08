import UserService from "../user/UserService";
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import AuthService from './AuthService';



export class AuthMiddleware {
    private static instance: AuthMiddleware;

    static getInstance() {
        if (!AuthMiddleware.instance) {
            AuthMiddleware.instance = new AuthMiddleware();
        }
        return AuthMiddleware.instance;
    }

    public async validateEmailExists(req: Request, res: Response, next: NextFunction) {
        console.log("validate email exists validation")
        const user = await UserService.getUserByEmail(req.body.email);
        if (user) {
            console.log('completed validation')
            next();
        } else {
            res.status(404).json({error: 'User not found.'});
        }
    }

    public async validateCorrectPassword(req: Request, res: Response, next: NextFunction) {
        console.log("validate password validation")
        const user = await UserService.getUserByEmail(req.body.email);
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            console.log('completed validation')
            next();
        } else {
            res.status(404).json({error: 'Email or password is incorrect.'});
        }
    }

    public async getJWTTokenData(req: Request, res: Response, next: NextFunction) {
        const token = req.get("Authorization");

        // No jwt token provided
        if (!token) {
            res.status(401).json({ error: "Missing token."});
        }
        
        try {
            const user_id: number = parseInt(AuthService.verifyJWTToken(token!) as string);
            req.user_id = user_id;
            next();
        } catch(err) {
            res.status(401).json({ error: err.message});
        }
    }
}

export default AuthMiddleware.getInstance();