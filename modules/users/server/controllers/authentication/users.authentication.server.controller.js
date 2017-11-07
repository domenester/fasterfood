'use strict';

const path = require('path'),
      passport = require(path.resolve('./config/lib/passport')),
      tingoDB = require(path.resolve('./config/lib/tingodb'));

console.log("TINGO PATH: " + path.resolve('./config/lib/tingodb'));

module.exports.signup = passport.authenticate('signup', {
  successRedirect : '/',
  failureRedirect : '/sign-in'
});

module.exports.signin = 
(req, res, next) => { 
  passport.authenticate('signin', {
    failureRedirect: '/sign-in',
    failureFlash : true
  }, function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return next(info); }
      req.login(user, function(err) {
        if (err) { return next(err); }
        console.log("LOGGIN!");
        console.log("User logged in: " + req.user.email);
        return res.json(req.user);
      });
    }
  )(req, res, next);
}
