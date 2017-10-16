'use strict';

// Root routing
  var user = require('../controllers/user.server.controller');
  
module.exports = function (app) {  

  app.route('/register').get(user.register);
};
