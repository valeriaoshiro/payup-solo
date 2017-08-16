var Transaction = require('../models/transaction');
var User = require('../models/user');
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);

module.exports = {
  sendMessage: sendMessage,
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

function sendMessage(req, res) {
  Transaction.findById(req.params.id).populate('user').exec((err, transaction) => {
    var cleanPhone = transaction.phone.replace(/[^\d]*/gi, "");
    client.messages.create({
      from: '+13238706472',
      to: '+1' + cleanPhone,
      body: 'This is a friendly reminder: You owe ' + transaction.user.name + ' $' + (transaction.amount - transaction.amountPaid),
      mediaUrl: 'https://media.giphy.com/media/MbIYMkQhIGMc8/giphy.gif'
    }, function(err, message) {
      if(err) {
        console.error(err);
      } else {
        console.log(message.sid);
        res.redirect(`/users`)
      }
    }); 
  });
}

function newTransaction(req, res) {
  res.render('./transactions/new', {transaction: {}, user: req.user.id});
}

function create(req, res) {
  User.findById(req.user.id, function(err, user) {
    var newDate;
    if(!req.body.date){
      newDate = new Date();
    } else {
      newDate = new Date(req.body.date);
    }
    var transaction = new Transaction (
      {date: newDate, name: req.body.name, description: req.body.description, amount: Number(req.body.amount), phone: req.body.phone, user: user._id}
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
  Transaction.findById(req.params.id).populate('user').exec((err, transaction) => {
    transaction.payments.push({date: req.body.date, amount: req.body.amount});
    transaction.amountPaid += Number(req.body.amount);
    transaction.save(err => {
      res.redirect(`/transactions/${transaction.id}`);
    });
  });
}