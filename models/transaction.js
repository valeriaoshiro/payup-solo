var mongoose = require('mongoose');

var paymentsSchema = new mongoose.Schema({
    date: String,
    amount: Number    
},{
    timestamps: true
});

var transcationSchema = new mongoose.Schema({
    name: String,
    description: String,
    amount: Number,
    phone: String,
    // image:
    payments: [paymentsSchema]
},{
    timestamps: true
});

module.exports = mongoose.model('Transcation', transactionSchema);