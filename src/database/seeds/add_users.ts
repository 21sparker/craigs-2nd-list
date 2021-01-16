import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            name: 'Alicia D. Macomber', 
            email: 'AliciaDMacomber@rhyta.com', 
            password: 'mypassword',
            phone_number: '856-672-5718',
            address: '4892 Prospect Street',
            city: 'Haddonfield',
            state: 'NJ',
            zip: '08033'
        },
        {
            name: 'David M. Motley', 
            email: 'DavidMMotley@teleworm.us', 
            password: 'mypassword',
            phone_number: '213-333-0527',
            address: '4038 Brannon Street',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90071'
        },
        {
            name: 'Maria A. Benjamin', 
            email: 'MariaABenjamin@jourrapide.com', 
            password: 'mypassword',
            phone_number: '215-357-1507',
            address: '3404 Burning Memory Lane',
            city: 'Churchville',
            state: 'PA',
            zip: '18966'
        },
    ]);
};
