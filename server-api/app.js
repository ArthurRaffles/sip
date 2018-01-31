
const express = require('express');
const app = express();

const users = require('./routes/users');
const books = require('./routes/books');

app.use('/users', users);
app.use('/books', books);
module.exports = app;