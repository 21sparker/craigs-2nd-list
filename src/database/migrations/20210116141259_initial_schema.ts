import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.increments('user_id').primary();
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable();
        table.text('password').notNullable();
        table.string('phone_number', 255);
        table.text('address');
        table.text('city');
        table.text('state');
        table.string('zip', 255);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users');
}

