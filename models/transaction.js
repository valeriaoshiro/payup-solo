var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var paymentsSchema = new mongoose.Schema({
    date: Date,
    amount: Number    
},{
    timestamps: true
});

var transactionSchema = new mongoose.Schema({
    date: Date,
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

transactionSchema.set('toJSON', {
    transform: function(doc, ret, options){
        var retJson = {
            description: ret.description,
            amount: ret.amount,
            amountPaid: ret.amountPaid
        };
        return retJson;
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);