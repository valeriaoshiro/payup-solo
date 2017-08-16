var Transaction = require('./../../models/transaction');

module.exports = {
    getAllTransactions
}

function getAllTransactions(req, res){
    Transaction.find({}, function(err, transaction){
        res.status(200).json(transaction);
    })
}