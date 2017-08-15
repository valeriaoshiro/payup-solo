var User = require('../models/user');
var Transaction = require('../models/transaction');

module.exports = {
  index: index,
  show: show,
  edit: edit,
  update: update
};

function index (req, res) {
  User.find({}, function(err, users){
    res.render('./users/index', {users: users, user: req.user.id})
  });  
}

function show (req, res) {
  User.findById(req.user.id, function (err, user) {
    var arr = [];
    Transaction.find({}).sort('date').exec(function(err, trans) {
      trans.forEach(function(tr){
        if(tr.user == user.id) arr.push(tr);
      });
      res.render('./users/show', {user: req.user.id, userDetail: user, transactions: arr});
    });
  });
}

function edit (req, res) {

}

function update (req, res) {

}
