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
        required: ['name'],

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
    // static modifiers: Modifiers = {
    //     // Our example modifier is a a semi-dumb fuzzy name match. We split the
    //     // name into pieces using whitespace and then try to partially match
    //     // each of those pieces to both the `firstName` and the `lastName`
    //     // fields.
    //     searchByName(query, name) {
    //         // This `where` simply creates parentheses so that other `where`
    //         // statements don't get mixed with the these.
    //         query.where((query) => {
    //             for (const namePart of name.trim().split(/\s+/)) {
    //             for (const column of ['firstName', 'lastName']) {
    //                 query.orWhereRaw('lower(??) like ?', [column, namePart.toLowerCase() + '%'])
    //             }
    //             }
    //         })
    //     },
    // }
}