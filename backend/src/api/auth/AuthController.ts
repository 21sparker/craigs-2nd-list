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
        console.log("reached token request")
        const user = await UserService.getUserByEmail(req.body.email);
        console.log("user: ", user);
        console.log("user_id: ", user.user_id.toString());
        console.log("privatekey: " , AuthConfig.privateKey);
        try {
            const token = jwt.sign({ user_id: user.user_id.toString() }, 
            AuthConfig.privateKey,
            { expiresIn: '24h' });
            console.log("completed")
            res.status(200).json({user_id: user.user_id, token: token});
        } catch(err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        }
    }
}

export default AuthController.getInstance();