"use strict";

/**
 * Module dependencies.
 */
let _ = require("lodash"),
	glob = require("glob"),
	path = require("path"),
	logger = require("./lib/logger"),
	global = require("./global");

logger.info("Global rooth path: " + global.path.root);
logger.info("Global userData path: " + global.path.userData);

/**
 * Get files by glob patterns
 */
var getGlobbedPaths = function (globPatterns, excludes) {
	// URL paths regex
	//eslint-disable-next-line no-useless-escape
	var urlRegex = new RegExp("^(?:[a-z]+:)?\/\/", "i");

	// The output array
	var output = [];

	// If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function (globPattern) {
			output = _.union(output, getGlobbedPaths(globPattern, excludes));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			var files = glob.sync(globPatterns);
			if (excludes) {
				files = files.map(function (file) {
					if (_.isArray(excludes)) {
						for (var i in excludes) {
							file = file.replace(excludes[i], "");
						}
					} else {
						file = file.replace(excludes, "");
					}
					return file;
				});
			}
			output = _.union(output, files);
		}
	}

	return output;
};

/**
 * Initialize global configuration files
 */
var initGlobalConfigFolders = function (config) {
	// Appending files
	config.folders = {
		server: {},
		client: {}
	};
	logger.info("processCwd: " + process.cwd());
	logger.info("appPath: " + global.path.root);
	logger.info("appPathReplace: " + global.path.root.replace(new RegExp(/\\/g), "/"));
	// Setting globbed client paths
	config.folders.client = getGlobbedPaths( global.path.root + "/modules/*/client/", global.path.root.replace(new RegExp(/\\/g), "/"));
};

var initGlobalConfigFiles = (config, assets) => {
	// Appending files
	config.files = {
		server: {},
		client: {}
	};

	// Setting Globbed route files
	config.files.server.routes = getGlobbedPaths(assets.server.routes);
	// Setting Globbed config files
	config.files.server.configs = getGlobbedPaths(assets.server.config);
	// Setting Globbed js files
	config.files.client.js = getGlobbedPaths(assets.client.lib.js, "public/").concat(getGlobbedPaths(assets.client.js, ["public/"]));
	// Setting Globbed css files
	config.files.client.css = getGlobbedPaths(assets.client.lib.css, "public/").concat(getGlobbedPaths(assets.client.css, ["public/"]));
	logger.info("config.files.client.css: " + JSON.stringify(config.files.client.css));
	// Setting Globbed views files
	config.files.client.views = getGlobbedPaths(assets.client.views, "public/");
};

/** Initialize the environment variables */
var initEnvironmentVariables = () => {
  
	process.env.FORCE_COLOR = 1;
};

var initLogConfig = () => {
  
	//bunyan.createLogger({name: "myapp"});
};

var initGlobalConfig = () => {
	// Get the default assets
	var assets = require(path.join( global.path.root, "/config/assets/default"));
	// Get the default config
	var config = require(path.join( global.path.root, "/config/env/default"));
	// Initialize global globbed files
	initGlobalConfigFiles(config, assets);
	// Initialize global globbed folders
	initGlobalConfigFolders(config, assets);

	initEnvironmentVariables();

	initLogConfig();

	//logger.info("config file: "+JSON.stringify(config));

	return config;
};

module.exports = initGlobalConfig();
