'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  chalk = require('chalk'),
  glob = require('glob'),
  //fs = require('fs'),
  path = require('path');

const { global } = require('./global');

/**
 * Get files by glob patterns
 */
var getGlobbedPaths = function (globPatterns, excludes) {
  // URL paths regex
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

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
              file = file.replace(excludes[i], '');
            }
          } else {
            file = file.replace(excludes, '');
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
var initGlobalConfigFolders = function (config, assets) {
  // Appending files
  config.folders = {
    server: {},
    client: {}
  };
  console.log('processCwd: ' + process.cwd());
  console.log('appPath: ' + global.path.root);
  console.log('appPathReplace: ' + global.path.root.replace(new RegExp(/\\/g), '/'));
  // Setting globbed client paths
  config.folders.client = getGlobbedPaths( global.path.root + '/modules/*/client/', global.path.root.replace(new RegExp(/\\/g), '/'));
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
  config.files.client.js = getGlobbedPaths(assets.client.lib.js, 'public/').concat(getGlobbedPaths(assets.client.js, ['public/']));
  // Setting Globbed css files
  config.files.client.css = getGlobbedPaths(assets.client.lib.css, 'public/').concat(getGlobbedPaths(assets.client.css, ['public/']));
  console.log('config.files.client.css: ' + JSON.stringify(config.files.client.css));
  // Setting Globbed views files
  config.files.client.views = getGlobbedPaths(assets.client.views, 'public/');
};

var initGlobalConfig = () => {
	// Get the default assets
  var assets = require(path.join( global.path.root, '/config/assets/default'));
	// Get the default config
	var config = require(path.join( global.path.root, '/config/env/default'));
	// Initialize global globbed files
	initGlobalConfigFiles(config, assets);
  // Initialize global globbed folders
  initGlobalConfigFolders(config, assets);

  console.log('config file: '+JSON.stringify(config));

	return config;
};

module.exports = initGlobalConfig();
