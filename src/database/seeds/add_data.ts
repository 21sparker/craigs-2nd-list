import * as Knex from "knex";
import bcrypt from 'bcrypt';
import { AuthConfig } from '../../config';

export async function seed(knex: Knex): Promise<void> {
    // // Deletes ALL existing entries
    await knex("goods").del();
    await knex("subcategories").del();
    await knex("categories").del();
    await knex("users").del();

    // Inserts seed entries
    await knex("categories").insert([
        { name: "Goods" },
        { name: "Jobs" },
        { name: "Housing"}
    ]);

    await knex("subcategories").insert([
        { name: "Electronics", category_id: 1},
        { name: "Cars", category_id: 1},
        { name: "Furniture", category_id: 1},
        { name: "Office", category_id: 1},
        { name: "Appliances", category_id: 1},
        { name: "Clothing", category_id: 1},

        { name: "General Labor", category_id: 2},
        { name: "Business", category_id: 2},
        { name: "Software", category_id: 2},
        { name: "Government", category_id: 2},
        { name: "Legal", category_id: 2},
        { name: "Marketing", category_id: 2},

        { name: "Apartments", category_id: 3},
        { name: "Houses", category_id: 3},
        { name: "Commercial", category_id: 3},
    ]);

    await knex("users").insert([
        {
            name: 'Alicia D. Macomber', 
            email: 'AliciaDMacomber@rhyta.com', 
            password: await bcrypt.hash("aliciaIsAwesome", AuthConfig.saltRounds),
            phone_number: '856-672-5718',
            address: '4892 Prospect Street',
            city: 'Haddonfield',
            state: 'NJ',
            zip: '08033'
        },
        {
            name: 'David M. Motley', 
            email: 'DavidMMotley@teleworm.us', 
            password: await bcrypt.hash("11@13placE", AuthConfig.saltRounds),
            phone_number: '213-333-0527',
            address: '4038 Brannon Street',
            city: 'Los Angeles',
            state: 'CA',
            zip: '90071'
        },
        {
            name: 'Maria A. Benjamin', 
            email: 'MariaABenjamin@jourrapide.com', 
            password: await bcrypt.hash("testpassword", AuthConfig.saltRounds),
            phone_number: '215-357-1507',
            address: '3404 Burning Memory Lane',
            city: 'Churchville',
            state: 'PA',
            zip: '18966'
        },
    ]);

    await knex("goods").insert([
        {
            title: 'Mens Hybrid Design Yellow Hoodie 2XL',
            description: 'Mens Hybrid Design Yellow Hoodie 2XL Condition New $25.00',
            city: 'Tampa',
            state: 'FL',
            price: '25',
            image_url: 'https://images.craigslist.org/00V0V_f8p8fvUc8lS_0zK0t2_600x450.jpg',
            created_at: new Date('January 2, 2021 11:26:03 EST'),
            updated_at: new Date('January 6, 2021 11:26:03 EST'),
            user_id: 1,
            category_id: 1,
            subcategory_id: 6
        },
        {
            title: '08 Nissan titan',
            description: '08 nissan titan for sale.pretty good conditions.has 255k miles.runs good.cold ac.hot heat.paint is feded.leather seats.driver seat has a little wear.heated seats. Shifts good.please call or text 999-999-9999. title in hand.thanks',
            city: 'Tampa',
            state: 'FL',
            price: '4,000',
            image_url: 'https://images.craigslist.org/00S0S_cYJui5Y49OJz_0CI0iP_600x450.jpg',
            created_at: new Date('January 31, 2021 01:15:15 EST'),
            updated_at: new Date('January 31, 2021 01:15:15 EST'),
            user_id: 1,
            category_id: 1,
            subcategory_id: 2
        },
        {
            title: 'Beautiful patio table 40',
            description: '',
            city: 'Houston',
            state: 'TX',
            price: '40',
            image_url: 'https://images.craigslist.org/00W0W_g1AnEKLbSke_0CI0t2_600x450.jpg',
            created_at: new Date('January 15, 2021 03:01:00 CST'),
            updated_at: new Date('January 31, 2021 02:01:00 CST'),
            user_id: 2,
            category_id: 1,
            subcategory_id: 3 
        },
        {
            title: 'TWO 55" HITACHI LED TV\'S AS IS',
            description: `These 2 tv's have cracked screens. Use for parts? Unfortunately I moved and they both got damaged in transport I am open to price I am sure someone can use parts? Both of them have the Roku sticks but no remote.`,
            city: 'Houston',
            state: 'TX',
            price: '250',
            image_url: 'https://images.craigslist.org/00q0q_gL6B557GTmPz_0CI0t2_600x450.jpg',
            created_at: new Date('January 25, 2021 18:47:59 CST'),
            updated_at: new Date('January 25, 2021 19:48:59 CST'),
            user_id: 2,
            category_id: 1,
            subcategory_id: 1
        },
        {
            title: 'SHARK ROTATOR LIFT-AWAY VACUUM CLEANER',
            description: `LIKE NEW SHARK ROTATOR VACUUM CLEANER. BELONGED TO A RELATIVE WHO PASSED AWAY.

            SELLS AT KOHL’S FOR $299+ TAX. FOR SALE ON EBAY AT $169.
            
            WILL CONSIDER A REASONABLE OFFER.
            
            
            
            J
            `,
            city: 'Houston',
            state: 'TX',
            price: '500.50',
            image_url: 'https://images.craigslist.org/00404_41uMSZosgANz_0nY0t2_600x450.jpg',
            created_at: new Date('December 30, 2020 21:09:45 CST'),
            updated_at: new Date('January 1, 2021 21:15:45 CST'),
            user_id: 2,
            category_id: 1,
            subcategory_id: 5
        },
    ]);
};
