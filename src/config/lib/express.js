
var express = require('express');

/**
 * Configure view engine
 */
module.exports.initViewEngine = function (app) {
  // Set swig as the template engine
  app.engine('server.view.html', consolidate[config.templateEngine]);

  // Set views path and view engine
  app.set('view engine', 'server.view.html');
  app.set('views', './');
};

module.exports.init = function (db) {
  // Initialize express app
  var app = express();

  this.initViewEngine(app);

}