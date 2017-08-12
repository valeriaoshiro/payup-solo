var express = require('express');
var router = express.Router();
var transactionsController = require('../controllers/transactions');

router.get('/new', transactionsController.new);
router.post('/', transactionsController.create);

module.exports = router; 