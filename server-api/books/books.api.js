
const data = [{
    id: 1, title: 'war & peace'
},{
    id: 2, title: '1984'
}];

function getBookById(id) {
    return data.filter(book => book.id === id);
}
function getBooks() {
    return data;
}
module.exports = {
    getBookById,
    getBooks
}
