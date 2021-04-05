import { response } from 'express';
import request from 'supertest';
import { app, knex } from '../api/app';


// beforeAll(async () => {
//     await knex.migrate.latest();
//     await knex.seed.run();
// });

// afterAll(async () => {
//     await knex.migrate.rollback(undefined, true);
// });

describe("Create a post", () => {
    let jwtToken: string; 

    test("Login user", async (done) => {
        const user = {
            email: "MariaABenjamin@jourrapide.com",
            password: "testpassword"
        }

        const res = await request(app).post("/login").send(user);
        expect(res.status).toBe(200);
        jwtToken = res.body.token;
        console.log(jwtToken);
    })
})