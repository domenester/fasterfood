'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  defaultAssets = require('./src/config/assets/default'),
  gulp = require('gulp'),
  plugins = gulpLoadPlugins({
    rename: {
      'gulp-angular-templatecache': 'templateCache'
    }
  }),

// JS minifying task
gulp.task('uglify', function () {
    var assets = _.union(
      defaultAssets.client.js,
      defaultAssets.client.templates
    );
  
    return gulp.src(assets)
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.uglify({
        mangle: false
      }))
      .pipe(plugins.concat('application.min.js'))
      .pipe(gulp.dest('public/dist'));
  });