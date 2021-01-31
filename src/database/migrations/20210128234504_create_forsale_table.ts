import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {   
    return knex.schema.createTable('forsale', (table: Knex.TableBuilder) => {
        table.increments('post_id').primary();
        table.text('title').notNullable();
        table.text('description').notNullable();
        table.text('location').notNullable();
        table.string('price', 255).notNullable();
        table.text('image_url');
        table.timestamps(true, true);
        table.integer('user_id').notNullable();
        table.integer('category_id').notNullable();
        table.integer('subcategory_id').notNullable();
        table.foreign('user_id').references('user_id').inTable('users');
        table.foreign('category_id').references('category_id').inTable('categories');
        table.foreign('subcategory_id').references('subcategory_id').inTable('subcategories');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('forsale');
}

