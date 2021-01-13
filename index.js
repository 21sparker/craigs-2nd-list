const express = require('express');
const app = express();
const port = 3000;


app.get('/category', (req, res) => {
    // AUTHENTICATE
    // DATABASE STUFF, QUERIES
    // GIVE BACK THE DATA
    res.send('Hello World!');
})


app.listen(port, () => {
    console.log("Server started");
})