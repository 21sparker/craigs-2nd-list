import Category from './Category';
import Subcategory from './Subcategory';

interface CategoryQueryOuput {
    category: string;
    subcategory: string;
}


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

    public async listAll(): Promise<Array<Category>> {
        const queryResults = await Category.query()
            .join('subcategories', 'categories.category_id', '=', 'subcategories.category_id')
            .select('categories.category_id',
                'categories.name', 
                'subcategory_id',
                'subcategories.name AS subcategory'
            );

        let output: Array<CategoryInterface>;
        const results = queryResults.map((result: Category) => {
            // const item: CategoryQueryOuput = result as unknown as CategoryQueryOuput;
            
            // if (!output.hasOwnProperty(item.category) {
            //     output[item.category] = [];
            // }
        });
        // let a = results.map(item => { category: item.category, })
        // // const results = await Category.query().select();
        // console.log(typeof results[0])
        // const output = {};    
        // results.forEach((result) => {
        //     if (!output.hasOwnProperty(result.category))
        // })

        return queryResults;
    }
}

export default CategoryService.getInstance();