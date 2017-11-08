'use strict';

const path = require('path'),
      passport = require(path.resolve('./config/lib/passport')),
      tingoDB = require(path.resolve('./config/lib/tingodb'));

console.log("TINGO PATH: " + path.resolve('./config/lib/tingodb'));

const forceLogin = (req, res, user) => {
  req.login(user, function(err) {
    if (err) {
      console.log("passport.authenticate - req.login - error: " + JSON.stringify(err) );
      return next(err); 
    } else {
      console.log("passport.authenticate - req.login - User logged in: " + req.user.email);
      return res.json(req.user);
    }        
  });
};

module.exports.signup = (req, res, next) => { 
  passport.authenticate('signup', {
    failureRedirect: '/sign-up',
    failureFlash : true
  }, function(err, user, info) {      
      if (err) {
        console.log("passport.authenticate - error: " + JSON.stringify(err) );
        return res.status(500).json(info);
      }
      if (!user) {
        console.log("passport.authenticate - failure: " + JSON.stringify(info) );
        return res.status(500).json(info); 
      } else {
        forceLogin(req, res, user);
      }
    }
  )(req, res, next);
}

module.exports.signin = (req, res, next) => { 
  passport.authenticate('signin', {
    failureRedirect: '/sign-in',
    failureFlash : true
  }, function(err, user, info) {      
      if (err) {
        console.log("passport.authenticate - error: " + JSON.stringify(err) );
        return res.status(500).json(info); 
      }  
      if (!user) { 
        console.log("passport.authenticate - !user: " + JSON.stringify(info) );
        return res.status(500).json(info); 
      } else {
        forceLogin(req, res, user);
      }
    }
  )(req, res, next);
}
