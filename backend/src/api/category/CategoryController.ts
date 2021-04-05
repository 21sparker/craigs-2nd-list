import { Request, Response } from 'express';
import CategoryService from './CategoryService';


class CategoryController {
    private static instance: CategoryController;

    public static getInstance(): CategoryController {
        if (!CategoryController.instance) {
            CategoryController.instance = new CategoryController();
        }
        return CategoryController.instance;
    }

    // Get all categories and subcategories
    public async listCategories(req: Request, res: Response) {
        const categories = await CategoryService.listAll();
        res.status(200).json(categories);
    }
}

export default CategoryController.getInstance();