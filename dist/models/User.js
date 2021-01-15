"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class User extends objection_1.Model {
}
exports.default = User;
// Table name is the only required property.
User.tableName = 'users';
// Optional JSON schema. This is not the database schema! Nothing is generated
// based on this. This is only used for validation. Whenever a model instance
// is created it is checked against this schema. http://json-schema.org/.
User.jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string' },
        phone_number: { type: 'string', minLength: 1, maxLength: 255 },
        address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
    }
};
