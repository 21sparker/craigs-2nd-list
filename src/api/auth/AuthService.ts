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

    public verifyJWTToken(token: string): string | object {
        return jwt.verify(token, AuthConfig.privateKey);
    }
}

export default AuthService.getInstance();