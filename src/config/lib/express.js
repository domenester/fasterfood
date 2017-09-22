'use strict';

var express = require('express');
var config = require('../config');
var consolidate = require('consolidate');
var path = require('path');
var pathRoot = '../../../';
const {app} = require('electron');
const electron = app;

/**
 * Configure the modules static routes
 */
module.exports.initModulesClientRoutes = function (app) {
  // Setting the app router and static folder
  //app.use('/', express.static(path.resolve('./public')));
  //app.use('/', express.static( pathRoot + 'public'));

  // // Globbing static routing
  // config.folders.client.forEach(function (staticPath) {
  //   app.use(staticPath, express.static(path.resolve('./' + staticPath)));
  // });
};

/**
 * Configure the modules server routes
 */
module.exports.initModulesServerRoutes = function (app) {
  // Globbing routing files
  console.log('Config Stringigied: ' + JSON.stringify(config));
  console.log('elec path: ' + electron.getAppPath());
  require(electron.getAppPath() + "/src/modules/core/server/routes/core.server.routes.js")(app);
  // config.files.server.routes.forEach(function (routePath) {
  //   //require(path.resolve(routePath))(app);
  //   require(pathRoot + routePath)(app);
  // });
};

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