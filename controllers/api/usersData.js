var User = require('./../../models/user');

module.exports = {
    getAllUsersData
}

function getAllUsersData(req, res){
    User.find({}, function(err, user){
        res.status(200).json(user);
    })
}