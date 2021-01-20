import Subcategory from './Subcategory';


class CategoryService {
    private static instance: CategoryService;

    public static getInstance(): CategoryService {
        if (!CategoryService.instance) {
            CategoryService.instance = new CategoryService();
        }
        return CategoryService.instance;
    }

    public async listAll(): Promise<Array<Subcategory>> {
        return await Subcategory.query().select();
    }
}

export default CategoryService.getInstance();