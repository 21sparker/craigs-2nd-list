const request = require("supertest");
const app = require("../dist/app");

describe("Test the root path", () => {
    test("It should respond to the GET", () => {
        return request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
            })
    })
})