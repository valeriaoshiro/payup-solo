var express = require('express');
var router = express.Router();
var usersController = require('./../controllers/api/users');
var transactionsController = require('./../controllers/api/transactions');

router.get('/users', usersController.getAllUsers);
router.get('/transactions', transactionsController.getAllTransactions);

module.exports = router;
