import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('subcategories', (table: Knex.TableBuilder) => {
        table.increments('subcategory_id').primary();
        table.string('name', 255).notNullable();
        table.integer('category_id').notNullable();
        table.foreign('category_id').references('category_id').inTable('categories');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('subcategories');
}

