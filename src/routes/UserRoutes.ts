import express, { Request, Response, Router } from 'express';
import { userController } from '../controllers';

export const router = Router({ strict: true });

router.post('/', (req: Request, res: Response) => {
    userController.create(req, res);
});
router.get('/:userId', async (req: Request, res: Response) => {
    await userController.read(req, res);
});
router.patch('/:userId', (req: Request, res: Response) => {
    userController.update(req, res);
});
router.delete('/:userId', (req: Request, res: Response) => {
    userController.delete(req, res);
});