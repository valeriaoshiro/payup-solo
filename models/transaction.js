var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

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
    amountPaid: {type: Number, default: 0},
    phone: String,
    user: {type: ObjectId, ref: 'User'},
    // image:
    payments: [paymentsSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);