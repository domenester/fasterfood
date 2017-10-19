'use strict';

// Root routing
  var user = require('../controllers/user.server.controller');
  
module.exports = function (app) {  

  app.route('/sign-up').get(user.register);
};
