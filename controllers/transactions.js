var Transaction = require('../models/transaction');
var User = require('../models/user');

module.exports = {
  create: create,
  new: newTransaction,
  delete: del
};

function newTransaction(req, res) {
  res.render('transactions/new', {transaction: {}, user: req.user.id});
}

function create(req, res) {
  User.findById(req.user.id, function(err, user) {
    var transaction = new Transaction (
      {date: req.body.date, name: req.body.name, description: req.body.description, amount: Number(req.body.amount), phone: req.body.phone}
    )
    transaction.save(function(err) {
      user.transactions.push(transaction._id);
      res.redirect('/users', {user: req.user.id, users: });
    });
  });
}

function del(req, res) {

}