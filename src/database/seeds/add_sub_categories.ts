import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("subcategories").del();

    // Inserts seed entries
    await knex("subcategories").insert([
        { subcategory_id: 1, name: "Electronics", category_id: 1},
        { subcategory_id: 2, name: "Cars", category_id: 1},
        { subcategory_id: 3, name: "Furniture", category_id: 1},
        { subcategory_id: 4, name: "Office", category_id: 1},
        { subcategory_id: 5, name: "Electronics", category_id: 1},

        { subcategory_id: 6, name: "General Labor", category_id: 2},
        { subcategory_id: 7, name: "Business", category_id: 2},
        { subcategory_id: 8, name: "Software", category_id: 2},
        { subcategory_id: 9, name: "Government", category_id: 2},
        { subcategory_id: 10, name: "Legal", category_id: 2},
        { subcategory_id: 11, name: "Marketing", category_id: 2},


        { subcategory_id: 12, name: "Apartments", category_id: 3},
        { subcategory_id: 13, name: "Houses", category_id: 3},
        { subcategory_id: 14, name: "Commercial", category_id: 3},

    ]);
};
