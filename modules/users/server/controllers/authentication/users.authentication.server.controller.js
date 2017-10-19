'use strict';

const path = require('path'),
      passport = require(path.resolve('./config/lib/passport')),
      tingoDB = require(path.resolve('./config/lib/tingodb'));

console.log("TINGO PATH: " + path.resolve('./config/lib/tingodb'));
/**
 * Signup
 */
module.exports.signup = passport.authenticate('signup', {
  successRedirect : '/home',
  failureRedirect : '/sign-in'
});

// function (req, res) {
//   // For security measurement we remove the roles from the req.body object
//   //delete req.body.roles;

//   // Init Variables
//   //let userCollection = tingoDB.getCollectino('users');
//   let user = req.body;
//   var message = null;

//   // Add missing user fields
//   //user.provider = 'local';
//   //user.displayName = user.firstName + ' ' + user.lastName;

//   // Then save the user
//   user.save(function (err) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       // Remove sensitive data before login
//       user.password = undefined;
//       user.salt = undefined;

//       req.login(user, function (err) {
//         if (err) {
//           res.status(400).send(err);
//         } else {
//           res.json(user);
//         }
//       });
//     }
//   });
// };