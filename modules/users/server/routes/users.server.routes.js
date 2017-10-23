'use strict';

// Root routing
const user = require('../controllers/user.server.controller');

module.exports = function (app) {  
  app.post('/sign-up', user.signup);
  app.post('/signing-in', user.signin);
}
