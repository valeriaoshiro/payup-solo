var Transaction = require('../models/transaction');
var User = require('../models/user');

module.exports = {
  create: create,
  new: newTransaction,
  edit: edit,
  update: update,
  delete: del,
  show: show,
  createPayment: createPayment,
  editPayment: editPayment,
  updatePayment: updatePayment
};

function newTransaction(req, res) {
  res.render('./transactions/new', {transaction: {}, user: req.user.id});
}

function create(req, res) {
  User.findById(req.user.id, function(err, user) {
    var transaction = new Transaction (
      {date: req.body.date, name: req.body.name, description: req.body.description, amount: Number(req.body.amount), phone: req.body.phone, user: user._id}
    )
    transaction.save(function(err) {
      res.redirect(`/users`);
    });
  });
}

function edit(req, res) {
  Transaction.findById(req.params.id, function(err, transaction) {
    res.render('./transactions/edit', {transaction: transaction, user: req.user.id});
  });
}

function editPayment(req, res) {
  Transaction.findById(req.params.id, function(err, transaction) {
   transaction.payments.forEach(function(payment){
     if(payment.id === req.params.paymentId){
      res.render('./transactions/editpayment', {transaction: transaction, user: req.user.id, payment: payment});
     }
    });
  });
}

function updatePayment(req, res) {
  var sumAmountPaid = 0;
  Transaction.findById(req.params.id, function(err, transaction) {
    transaction.payments.forEach(function(payment){
      if(payment.id === req.params.paymentId){
        if(req.body.date){
          payment.date = new Date(req.body.date);
        }
        payment.amount = req.body.amount;
      }
      sumAmountPaid += payment.amount;
    });
    transaction.amountPaid = sumAmountPaid;
    transaction.save(err => {
      // console.log("****Payment ", payment); 
      console.log("****Req.body ", req.body);
      res.redirect(`/transactions/${transaction.id}`);
    });
  })
}

function update(req, res) {
  Transaction.findByIdAndUpdate(req.params.id, req.body, function(err, transaction) {
    res.redirect(`/users`);
  });
}

function del(req, res) {
  Transaction.findByIdAndRemove(req.params.id, function(err) {
    res.redirect(`/users`);
  });
}

function show(req, res) {
  Transaction.findById(req.params.id, function(err, transaction) {
    res.render('./transactions/show', {transaction: transaction, user: req.user.id});
  });
}

function createPayment(req, res) {
  Transaction.findById(req.params.id).populate('users').exec((err, transaction) => {
    transaction.payments.push({date: req.body.date, amount: req.body.amount});
    transaction.amountPaid += Number(req.body.amount);
    transaction.save(err => {
      res.redirect(`/transactions/${transaction.id}`);
    });
  });
}