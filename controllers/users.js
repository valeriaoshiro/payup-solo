var User = require('../models/user');
var Transaction = require('../models/transaction');

module.exports = {
  index: index,
  show: show,
  edit: edit,
  update: update
};

function index (req, res) {
  
}

function show (req, res) {
  User.findById(req.user.id, function (err, user) {
    res.render('users/show', {user: user});
  });
}

function edit (req, res) {

}

function update (req, res) {

}