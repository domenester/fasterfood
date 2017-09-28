'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  defaultAssets = require('./config/assets/default'),
  gulp = require('gulp'),
  runSequence = require('run-sequence'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  path = require('path'),
  endOfLine = require('os').EOL,
  plugins = gulpLoadPlugins({
    rename: {
      'gulp-angular-templatecache': 'templateCache'
    }
  });

// JS minifying task
gulp.task('uglify', function () {
	var assets = _.union(
		defaultAssets.client.lib.js,
		defaultAssets.client.js		
	);

	return gulp.src(assets)
		.pipe(plugins.ngAnnotate())
		.pipe(plugins.uglify({
		mangle: false
		}))
		.pipe(plugins.concat('angular.min.js'))
		.pipe(gulp.dest('public/dist'));
});

// JS linting task
gulp.task('jshint', function () {
  var assets = _.union(
    defaultAssets.server.gulpConfig,
    defaultAssets.server.allJS,
    defaultAssets.client.js
  );

  return gulp.src(assets)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.jshint.reporter('fail'));
});

// Angular template cache task
gulp.task('templatecache', function () {
  var re = new RegExp('\\' + path.sep + 'client\\' + path.sep, 'g');

  return gulp.src(defaultAssets.client.views)
    .pipe(plugins.templateCache('templates.js', {
      root: 'modules/',
      module: 'core',
      templateHeader: '(function () {' + endOfLine + '	\'use strict\';' + endOfLine + endOfLine + '	angular' + endOfLine + '		.module(\'<%= module %>\'<%= standalone %>)' + endOfLine + '		.run(templates);' + endOfLine + endOfLine + '	templates.$inject = [\'$templateCache\'];' + endOfLine + endOfLine + '	function templates($templateCache) {' + endOfLine,
      templateBody: '		$templateCache.put(\'<%= url %>\', \'<%= contents %>\');',
      templateFooter: '	}' + endOfLine + '})();' + endOfLine,
      transformUrl: function (url) {
        return url.replace(re, path.sep);
      }
    }))
    .pipe(gulp.dest('build'));
});

// Lint project files and minify them into two production files.
gulp.task('build', ['jshint', 'templatecache'], function(){});