const express = require('express');
const { Model } = require('objection');
const Knex = require('knex');

const knex = Knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'test'
    }
});

// Give the knex instance to objection
Model.knex(knex);

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'user_id';
    }
}

async function doDBstuff() {
    // Get User
    const first_person = await User.query().where('name', 'sean');
    return first_person;
}

let user_to_show = null;
doDBstuff().then((res) => { user_to_show = res[0] })

const app = express();
const port = 3000;

app.get('/user', (req, res) => {
    res.json(user_to_show);
})


app.listen(port, () => {
    console.log("Server started");
})