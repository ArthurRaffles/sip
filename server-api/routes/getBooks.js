var books = require('../books/books.api');

function getBooks(req, resp) {
    resp.send(books.getBooks());
}
module.exports = getBooks;
