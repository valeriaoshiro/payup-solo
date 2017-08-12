var mongoose = require('mongoose');

var paymentsSchema = new mongoose.Schema({
    date: String,
    amount: Number    
},{
    timestamps: true
});

var transactionSchema = new mongoose.Schema({
    date: String,
    name: String,
    description: String,
    amount: Number,
    phone: String,
    // image:
    payments: [paymentsSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);