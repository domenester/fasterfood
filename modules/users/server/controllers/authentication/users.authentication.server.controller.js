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
      if (err) {
        console.log("passport.authenticate - error: " + JSON.stringify(err) );
        return next(err); 
      }      
      if (!user) { 
        console.log("passport.authenticate - !user: " + JSON.stringify(info) );
        return res.status(500).json(info); 
      }
      req.login(user, function(err) {
        if (err) {
          console.log("passport.authenticate - req.login - error: " + JSON.stringify(err) );
          return next(err); 
        } else {
          console.log("passport.authenticate - req.login - User logged in: " + req.user.email);
          return res.json(req.user);
        }        
      });
    }
  )(req, res, next);
}
