"use strict";

let config = require("../config"),
	express = require("express"),
	consolidate = require("consolidate"),
	compress = require("compression"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	cookieParser = require("cookie-parser"),
	passport = require("passport"),
	flash = require("connect-flash"),
	session = require("express-session"),
	global = require("../global");

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
		res.locals.host = req.protocol + "://" + req.hostname;
		res.locals.url = req.protocol + "://" + req.headers.host + req.originalUrl;
		res.locals.user = req.user;
		next();
	});
};

/**
 * Invoke modules server configuration
 */
module.exports.initModulesConfiguration = function (app, db) {
	config.files.server.configs.forEach(function (configPath) {
		require(global.path.root + "/" + configPath)(app, db);
	});
};

/**
 * Initialize application middleware
 */
module.exports.initMiddleware = function (app) {

	// Should be placed before express.static
	app.use(compress({
		filter: function (req, res) {
			return (/json|text|javascript|css|font|svg/).test(res.getHeader("Content-Type"));
		},
		level: 9
	}));
	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Add the cookie parser and flash middleware
	app.use(cookieParser());
	app.use(flash());

	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
};

/**
 * Configure Express session
 */
module.exports.initSession = function (app) {
	// Express MongoDB session storage
	app.use(session({ 
		secret: "secretToBeChanged",
		cookie: { maxAge: 60000 },
		saveUninitialized: false,
		resave: false
	}));
};

/**
 * Configure the modules static routes
 */
module.exports.initModulesClientRoutes = function (app) {
	// Setting the app router and static folder
	app.use("/", express.static(global.path.root + "/public"));

	// Globbing static routing
	config.folders.client.forEach(function (staticPath) {
		let toUse = global.path.root + staticPath.replace(new RegExp(/\//g), "\\");
		console.log("staticPath : " + staticPath);
		console.log("globalPath : " + toUse);
		app.use(staticPath, express.static(toUse));
	});  
};

/**
 * Configure the modules server routes
 */
module.exports.initModulesServerRoutes = function (app) {
	// Globbing routing files
	config.files.server.routes.forEach(function (routePath) {
		console.log("routePath: " + global.path.root + "/" + routePath);
		require(global.path.root + "/" + routePath)(app);
	});
};

/**
 * Configure view engine
 */
module.exports.initViewEngine = function (app) {
	// Set swig as the template engine
	app.engine("server.view.html", consolidate[config.templateEngine]);

	// Set views path and view engine
	app.set("view engine", "server.view.html");
	app.set("views", "./");
};

module.exports.init = function (db) {
	// Initialize express app
	var app = express();

	this.initLocalVariables(app);

	// Initialize Express middleware
	this.initMiddleware(app);

	this.initModulesConfiguration(app, db);

	this.initViewEngine(app);

	this.initSession(app);

	this.initModulesClientRoutes(app);

	this.initModulesServerRoutes(app);

	return app;
};
