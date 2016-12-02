var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var mongoAddress = process.env.DB_PORT_27017_TCP_ADDR || 'localhost';

mongoose.connect(`mongodb://${mongoAddress}/shortly`);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;