
function getUsers(req, res) {
    res.send([
        { name: 'bob', age: 10 },
        { name: 'jim', age: 12 }
    ]);
}
module.exports = getUsers;
