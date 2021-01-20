import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("categories").del();

    // Inserts seed entries
    await knex("categories").insert([
        { category_id: 1, name: "Goods" },
        { category_id: 2, name: "Jobs" },
        { category_id: 3, name: "Housing"}
    ]);
};
