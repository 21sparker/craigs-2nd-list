import { Model, Modifiers } from 'objection';

export default class Category extends Model {
    category_id!: number;
    name!: string;

    static tableName = 'categories';

    static idColumn = 'category_id';
}