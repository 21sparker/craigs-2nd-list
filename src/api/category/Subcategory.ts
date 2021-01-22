import { Model, Modifiers } from 'objection';

export default class Subcategory extends Model {
    subcategory_id!: number;
    category_id!: number;
    name!: string;

    static tableName = 'subcategories';

    static idColumn = 'subcategory_id';

    static get relationMappings() {
        // Avoid circular dependencies
        const Category = require('./Category').default;

        console.log(Category);
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'categories.category_id',
                    to: 'subcategories.category_id'
                }
            }
        }
    } 
}