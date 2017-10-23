let bcrypt   = require('bcrypt-nodejs');

module.exports.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports.validPassword = function(passwordToValidate, password) {
    return bcrypt.compareSync(passwordToValidate, password);
};