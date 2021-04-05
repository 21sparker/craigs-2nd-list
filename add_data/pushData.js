const config = {
    host: process.env.DATABASE_HOST_NAME || Database.host,
    database: "v26_test",
    user: "tester",
    password: "tester",
    port: Number(process.env.DATABASER_PORT || Database.port),
}

const { Client } = require('pg');
const client = new Client();
await client.connect();

const data = require('./postings.json');
await client.end();