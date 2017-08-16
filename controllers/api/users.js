var User = require('./../../models/user');

module.exports = {
    getAllUsers
}

function getAllUsers(req, res){
    User.find({}, function(err, user){
        res.status(200).json(user);
    })
}