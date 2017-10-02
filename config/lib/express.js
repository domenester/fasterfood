'use strict';

var config = require('../config');
var express = require('express');
var consolidate = require('consolidate');
var compress = require('compression');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
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
 * Invoke modules server configuration
 */
module.exports.initModulesConfiguration = function (app, db) {
  config.files.server.configs.forEach(function (configPath) {
    require(electron.getAppPath() + '/' + configPath)(app, db);
  });
};

/**
 * Initialize application middleware
 */
module.exports.initMiddleware = function (app) {
  // // Showing stack errors
  // app.set('showStackError', true);

  // // Enable jsonp
  // app.enable('jsonp callback');

  // Should be placed before express.static
  app.use(compress({
    filter: function (req, res) {
      return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // // Initialize favicon middleware
  // app.use(favicon(app.locals.favicon));

  // // Enable logger (morgan)
  // app.use(morgan(logger.getFormat(), logger.getOptions()));

  // // Environment dependent middleware
  // if (process.env.NODE_ENV === 'development') {
  //   // Disable views cache
  //   app.set('view cache', false);
  // } else if (process.env.NODE_ENV === 'production') {
  //   app.locals.cache = 'memory';
  // }

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Add the cookie parser and flash middleware
  app.use(cookieParser());
  app.use(flash());
};

/**
 * Configure the modules static routes
 */
module.exports.initModulesClientRoutes = function (app) {
  // Setting the app router and static folder
  app.use('/', express.static(config.app.globalPath + '/public'));
  // console.log('static files: ' + electron.getAppPath() + '/public');
  // app.use('/', express.static( electron.getAppPath() + '/public'));

  // Globbing static routing
  config.folders.client.forEach(function (staticPath) {
    let toUse = config.app.globalPath + staticPath.replace(new RegExp(/\//g), '\\');
    console.log('staticPath : ' + staticPath);
    console.log('globalPath : ' + toUse);
    app.use(staticPath, express.static(toUse));
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
  app.set('views', './');
};

module.exports.init = function (db) {
  // Initialize express app
  var app = express();

  this.initLocalVariables(app);

  // Initialize Express middleware
  this.initMiddleware(app);

  this.initModulesConfiguration(app, db);

  this.initViewEngine(app);

  this.initModulesClientRoutes(app);

  this.initModulesServerRoutes(app);

  return app;

};