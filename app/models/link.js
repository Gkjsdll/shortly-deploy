var db = require('../config');
var crypto = require('crypto');

var linkSchema = db.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});

linkSchema.set('timestamps', true);

linkSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.get('url'));
  this.set('code', shasum.digest('hex').slice(0, 5));
  next();
});

module.exports = db.model('Link', linkSchema);
