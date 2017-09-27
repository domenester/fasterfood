'use strict';

var express = require('express');
var config = require('../config');
var consolidate = require('consolidate');
var path = require('path');
var pathRoot = '../../../';
const {app} = require('electron');
const electron = app;

/**
 * Initialize local variables
 */
module.exports.initLocalVariables = function (app) {
  // Setting application local variables
  app.locals.hello = "world";
  app.locals.jsFiles = config.files.client.js;
  app.locals.cssFiles = config.files.client.css;

  // Passing the request url to environment locals
  app.use(function (req, res, next) {
    res.locals.host = req.protocol + '://' + req.hostname;
    res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
    next();
  });
};

/**
 * Configure the modules static routes
 */
module.exports.initModulesClientRoutes = function (app) {
  // Setting the app router and static folder
  //app.use('/', express.static(path.resolve('./public')));
  console.log('static files: ' + electron.getAppPath() + '/src/public');
  app.use('/', express.static( electron.getAppPath() + '/src/public'));

  // Globbing static routing
  config.folders.client.forEach(function (staticPath) {
    console.log('staticPath : ' + electron.getAppPath() + staticPath.replace(new RegExp(/\//g), "\\"));
    app.use(staticPath, express.static(electron.getAppPath() + staticPath.replace(new RegExp(/\//g), "\\")));
  });
};

/**
 * Configure the modules server routes
 */
module.exports.initModulesServerRoutes = function (app) {
  // Globbing routing files
  config.files.server.routes.forEach(function (routePath) {
    console.log('routePath: ' + electron.getAppPath() + '/' + routePath);
    require(electron.getAppPath() + '/' + routePath)(app);
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
  app.set('views', electron.getAppPath() + '/src');
};

module.exports.init = function (db) {
  // Initialize express app
  var app = express();

  this.initViewEngine(app);

  this.initLocalVariables(app);

  this.initModulesClientRoutes(app);

  this.initModulesServerRoutes(app);

  return app;

}