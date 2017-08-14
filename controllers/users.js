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
    console.log(req.user.id);
    res.render('./users/index', {users: users, user: req.user.id})
  });  
}

function show (req, res) {
  User.findById(req.params.id).populate('transactions').exec(function(err, user){
    res.render('./users/show', {user: req.user.id, userDetail: user});

  })

  // User.findById(req.params.id, function (err, user) {
  //   console.log(user)
  //   // res.send("Test");
  //   res.render('./users/show', {user: req.user.id, userDetail: user});
  // });
}

function edit (req, res) {

}

function update (req, res) {

}
//5991e6ac9f8a45201602e37d
// 5991eab4eecbfe224becd3ef