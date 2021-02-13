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
        console.log("Token: " + token);
        // No jwt token provided
        if (token === undefined || token.split(' ').length === 1) {
            console.log("Token empty");
            res.status(401).json({ error: "Missing token."});
        } else {
            console.log("Token not empty")
            try {
                const tokenStr = token.split(' ')[1];
                console.log("Token Str: " + tokenStr);
                const data = AuthService.verifyJWTToken(tokenStr!) as any;
                console.log("Data: " + data);
                const user_id = parseInt(data["user_id"]);
                // const user_id: number = parseInt(AuthService.verifyJWTToken(tokenStr!) as string);
                console.log("User Id found: " + user_id.toString())
                req.user_id = user_id;
                next();
            } catch(err) {
                console.log("Error occurred with token: " + err.message)
                res.status(401).json({ error: err.message});
            }
        }

    }
}

export default AuthMiddleware.getInstance();