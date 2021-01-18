import { Request, Response } from 'express';

export abstract class CrudController {
    public abstract create(req: Request, res: Response): void;
    public abstract read(req: Request, res: Response): void;
    public abstract patch(req: Request, res: Response): void;
    public abstract delete(req: Request, res: Response): void;
}