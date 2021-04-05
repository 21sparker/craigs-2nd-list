import request from 'supertest';
import { app, knex } from '../api/app';

beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
});

afterAll(async () => {
    await knex.migrate.rollback(undefined, true);
});


describe("GET / - a simple api endpoint", () => {
    test("Hello API Request", async (done)=> {
        const response = await request(app).get("/")
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("You got me!")

        done();
    })
})

describe("GET /users", () => {
    test("Get a user", async (done) => {

        await request(app)
                .get('/users/1')
                .expect(200)
        
        done();
    })
})

describe("POST /users", () => {
    test("Add new user", async () => {
        const body = {
            name: 'Johnny',
            email: 'johnny_fake_@gmail.com',
            password: 'new_password'
        }
        const res = await request(app)
            .post('/users')
            .send(body);
        expect(res.status).toBe(201);
    });

    test("Add invalid user", async (done) => {
        const body = {
            name: 13,
            emil: "incorecctemail@email.com",
            psswd: "Wrong password"
        }

        await request(app)
            .post('/users')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)

        done();        
    })
    
})

describe("PATCH /users", () => {
    test("Update user email", async (done) => {
        const body = {
            email: 'patched_email@gmail.com',
        }
        await request(app)
            .patch('/users/1')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)

        done();
    })
})

describe("DELETE /users", () => {
    test("Delete a user", async (done) => {
        await request(app)
                .delete('/users/2')
                .send()
                .expect(204)
        
        done()
    })
})