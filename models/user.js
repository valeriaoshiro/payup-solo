var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
    avatar: String
    // transactions: [{type: ObjectId, ref: 'Transaction'}]
},{
    timestamps: true
});

userSchema.set('toJSON', {
	transform: function(doc, ret, options){
		var retJson = {
				name: ret.name
		};
		return retJson;
	}
});

module.exports = mongoose.model('User', userSchema);