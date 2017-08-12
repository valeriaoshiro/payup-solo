var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
    transactions: [{type:mongoose.Schema.Types.ObjectId, ref: 'Transaction'}]
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);