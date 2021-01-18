import { Model, Modifiers } from 'objection';

export default class User extends Model {
    user_id!: number
    name!: string
    email!: string
    password!: string
    phone_number!: string
    address!: string
    city!: string
    state!: string

    // Table name is the only required property.
    static tableName = 'users'

    // Id column
    static idColumn = 'user_id'

    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static jsonSchema = {
        type: 'object',
        required: ['email', 'password'],

        properties: {
            id: { type: 'integer' },
            name: { type: 'string', minLength: 1, maxLength: 255 },
            email: { type: 'string', minLength: 1, maxLength: 255 },
            password: { type: 'string' },
            phone_number: { type: 'string', minLength: 1, maxLength: 255 },
            address: { type: 'string'},
            city: { type: 'string'},
            state: { type: 'string'},

        }
    }

    // Modifiers are reusable query snippets that can be used in various places.
    static modifiers: Modifiers = {
        create(query, resource) {
            query.insert(resource)
                .returning('*') // Unique postgres callback that returns the new user
        },
        searchById(query, id) {
            query.findById(parseInt(id));
        },
        searchByEmail(query, email) {
            query.where('email', email)
                .first();
        },
        patchById(query, id, resource) {
            query.patch(resource)
                .where(User.idColumn, id)
                .returning('*')
                .first();
        },
        deleteById(query, id) {
            query.deleteById(id);
        }

    }
}