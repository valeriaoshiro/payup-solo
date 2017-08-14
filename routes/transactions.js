var express = require('express');
var router = express.Router();
var transactionsController = require('../controllers/transactions');

router.get('/new', transactionsController.new);
router.post('/', transactionsController.create);
router.get('/:id/edit', transactionsController.edit);
router.put('/:id', transactionsController.update);
router.delete('/:id', transactionsController.delete);

module.exports = router; 