import { Model, Modifier, Modifiers } from 'objection';


export default class Good extends Model {
    post_id!: number;
    title!: string;
    description!: string;
    city!: string;
    state!: string;
    price!: string;
    image_url!: string;
    created_at!: Date;
    updated_at!: Date;
    user_id!: number;
    category_id!: number;
    subcategory_id!: number;

    static tableName = 'goods';
    static idColumn = 'post_id';
    static get relationMappings() {
        const User = require('../user/User').default;
        const Category = require('../category/Category').default;
        const Subcategory = require('../category/Subcategory').default;

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'goods.user_id',
                    to: 'users.user_id'
                }
            },
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'goods.category_id',
                    to: 'categories.category_id'
                }
            },
            subcategory: {
                relation: Model.BelongsToOneRelation,
                modelClass: Subcategory,
                join: {
                    from: 'goods.subcategory_id',
                    to: 'subcategories.subcategory_id'
                }
            }
        }
    }

    static modifiers: Modifiers = {
        create(query, resource) {
            query.insert(resource)
                .returning('*');
        },
        searchById(query, id) {
            query.findById(parseInt(id));
        },
        patchById(query, id, resource) {
            query.patch(resource)
                .where(Good.idColumn, parseInt(id))
                .returning('*');
        },
        deleteById(query, id) {
            query.deleteById(parseInt(id));
        }
    }
}