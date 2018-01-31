var express = require('express');
var router = express.Router();
var getUsers = require('./getUsers');

router.get('/', getUsers);

module.exports = router;
