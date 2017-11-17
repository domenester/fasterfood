'use strict';

// Root routing
var core = require('../controllers/core.server.controller');
const path = require('path');
const userAuth = require(path.resolve('./config/services/user-auth'));

module.exports = function (app) {
  // Define error pages
  //app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  //app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);

  app.get('/', userAuth.isAuthenticated, core.home);
};
