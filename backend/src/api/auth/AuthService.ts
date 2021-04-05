import { AuthConfig } from '../../config';
import jwt from 'jsonwebtoken';

class AuthService {
    private static instance: AuthService;

    public static getInstance(): AuthService {
        if(!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public verifyJWTToken(token: string): object {
        const data = jwt.verify(token, AuthConfig.privateKey) as object;
        console.log("JWT data: " + data);
        return data;
    }
}

export default AuthService.getInstance();