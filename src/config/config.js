'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  chalk = require('chalk'),
  glob = require('glob'),
  //fs = require('fs'),
  path = require('path');

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

var initGlobalConfigFiles = (config, assets) => {
	// Appending files
	config.files = {
		server: {},
		client: {}
	};

	// Setting Globbed route files
	config.files.server.routes = getGlobbedPaths(assets.server.routes);
}

var initGlobalConfig = () => {
	// Get the default assets
	var assets = require(path.join(process.cwd(), 'src/config/assets/default'));
	// Get the default config
	var config = require(path.join(process.cwd(), 'src/config/env/default'));
	// Initialize global globbed files
	initGlobalConfigFiles(config, assets);

	return config;
}

module.exports = initGlobalConfig();
