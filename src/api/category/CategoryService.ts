import Category from './Category';
import Subcategory from './Subcategory';

interface CategoryInterface {
    category_id: number;
    name: string;
    subcategories: Array<SubcategoryInterface>;
}

interface SubcategoryInterface {
    subcategory_id: number;
    name: string;
}

class CategoryService {
    private static instance: CategoryService;

    public static getInstance(): CategoryService {
        if (!CategoryService.instance) {
            CategoryService.instance = new CategoryService();
        }
        return CategoryService.instance;
    }

    public async listAll(): Promise<CategoryInterface[]> {
        const queryResults = await Category.query()
            .join('subcategories', 'categories.category_id', '=', 'subcategories.category_id')
            .select('categories.category_id',
                'categories.name', 
                'subcategory_id',
                'subcategories.name AS subcategory'
            );

        let output: CategoryInterface[] = [];
        let currentCategory: string;
        let currentCategoryInterface: CategoryInterface;
        queryResults.forEach((result: Category) => {

            // Change result to any type because we aliased some column names
            // that aren't part of the Category type.
            const item = result as any;

            // We are assuming categories are grouped together so create a new
            // CategoryInterface object when we find a new one as we iterate
            if (item.name !== currentCategory) {
                currentCategoryInterface = {
                    category_id: item.category_id,
                    name: item.name,
                    subcategories: []
                }
                output.push(currentCategoryInterface);
                currentCategory = item.name;
            }

            // Add the subcategory to the category interface
            currentCategoryInterface.subcategories.push({
                subcategory_id: item['subcategory_id'] as number,
                name: item['subcategory'] as string,
            });
        });

        return output;
    }
}

export default CategoryService.getInstance();