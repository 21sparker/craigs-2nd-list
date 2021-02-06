import { AuthConfig } from '../../config';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../user/UserService';

class AuthController {
    private static instance: AuthController;

    public static getInstance(): AuthController {
        if (!AuthController.instance) {
            AuthController.instance = new AuthController();
        }
        return AuthController.instance;
    }

    public async getJWTToken(req: Request, res: Response) {
        const user = await UserService.getUserByEmail(req.body.email);
        try {
            const token = jwt.sign(user.user_id.toString(), AuthConfig.privateKey,
            { expiresIn: '1h' });
            res.status(200).json({token: token});
        } catch(err) {
            res.status(500).end();
        }
    }
}

export default AuthController.getInstance();