'use strict';

module.exports = function (app) {
  // Root routing
  var user = require('../controllers/user.server.controller');

  app.route('/register').get(user.register);
};
