var express = require('express');
var router = express.Router();
var usersDataController = require('./../controllers/api/usersData');

router.get('/', usersDataController.getAllUsersData);

module.exports = router;
