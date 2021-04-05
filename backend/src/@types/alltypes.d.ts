declare module 'parse-database-url';

declare namespace Express {
    export interface Request {
        user_id?: number;
    }
}