import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('categories', (table: Knex.TableBuilder) => {
        table.increments('category_id')
        table.string('name', 255).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('categories');
}

