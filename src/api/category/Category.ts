import { Model, Modifiers } from 'objection';


export default class Category extends Model {
    category_id!: number;
    name!: string;

    static tableName = 'categories';

    static idColumn = 'category_id';

    static get relationMappings() {
        const Subcategory = require('./Subcategory').default;
        
        return {
            subcategories: {
                relation: Model.HasManyRelation,
                modelClass: Subcategory,
                join: {
                    from: 'categories.category_id',
                    to: 'subcategories.category_id'
                }
            }
        }
    }
}