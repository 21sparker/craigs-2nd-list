"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const objection_1 = require("objection");
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../knexfile"));
const constants_1 = require("./config/constants");
const routes_1 = require("./routes");
// const knex: Knex = Knex({
//     client: 'pg',
//     connection: {
//         host: 'localhost',
//         port: 5432,
//         user: 'postgres',
//         password: 'postgres',
//         database: 'test'
//     }
// });
// Initialize knex.
const knex = knex_1.default(knexfile_1.default.development);
// Give the knex instance to objection
objection_1.Model.knex(knex);
const app = express_1.default();
// Process json requests
app.use(express_1.default.json());
// Add routes
app.use('/user', routes_1.userRouter);
app.get('/', (req, res) => {
    console.log("Ran index");
    res.json({ message: "Ran inside index" });
});
app.listen(constants_1.PORT, () => {
    console.log(`Server started at port ${constants_1.PORT}`);
});
// TODO: Update with this error handler:
// http://vincit.github.io/objection.js/recipes/error-handling.html#examples
