'use strict';

var express = require('express');
var config = require('../config');
var consolidate = require('consolidate');

/**
 * Initialize local variables
 */
module.exports.initLocalVariables = function (app) {
  // Setting application local variables
  app.locals.hello = "world";

  // Passing the request url to environment locals
  app.use(function (req, res, next) {
    res.locals.host = req.protocol + '://' + req.hostname;
    res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
    next();
  });
};

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

  this.initLocalVariables(app);

  return app;

}