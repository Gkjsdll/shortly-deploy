var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


var userSchema = db.Schema({
  username: String,
  password: String
});

userSchema.set('timestamps', true);


userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    if (err) {
      console.error(err);
    } else {
      console.log('no err');
    }
    callback(isMatch);
  });
};

userSchema.methods.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      this.save();
    });
};

userSchema.pre('save', function(next) {
  if (this.isNew) {
    this.hashPassword();
  }
  next();
});

module.exports = db.model('User', userSchema);
