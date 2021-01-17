import request from 'supertest';
import app from '../api/app';

describe("GET / - a simple api endpoint", () => {
    test("Hello API Request", async ()=> {
        const response = await request(app).get("/")
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("You got me!")
    })
})


describe("POST /users", () => {
    test("Add new user", async (done) => {
        const body = {
            name: 'Johnny',
            email: 'johnny_fake_@gmail.com',
            password: 'new_password'
        }
        await request(app)
            .post('/users')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)

        done();
    })
})

describe("PATCH /users", () => {
    test("Add new user", async (done) => {
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