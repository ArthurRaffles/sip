var express = require('express');
var router = express.Router();
var getBooks = require('./getBooks');

router.get('/', getBooks);

module.exports = router;
