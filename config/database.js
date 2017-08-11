var mongoose = require('mongoose');
mongoose.Promise = Promise;

console.log('process.env.DATABASE_URL =', process.env.DATABASE_URL)

mongoose.connect(process.env.DATABASE_URL)
    .catch(err => {
        console.log('err =', err)
    });

mongoose.connection.once('open', function() {
    console.log(`Mongoose connection to ${process.env.DATABASE_URL}`);
});

module.exports = mongoose;