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
  console.log('this');
  console.log(this);
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      console.log('hash!', hash);
      this.password = hash;
    });
};

userSchema.pre('save', function(next) {
  this.hashPassword();
  next();
});

/*var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function() {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});*/

module.exports = db.model('User', userSchema);
