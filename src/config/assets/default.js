'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'src/public/lib/bootstrap/dist/css/bootstrap.css',
        'src/public/lib/bootstrap/dist/css/bootstrap-theme.css'
      ],
      js: [
        'src/public/lib/angular/angular.js',
        'src/public/lib/angular-resource/angular-resource.js',
        'src/public/lib/angular-animate/angular-animate.js',
        'src/public/lib/angular-messages/angular-messages.js',
        'src/public/lib/angular-ui-router/release/angular-ui-router.js',
        'src/public/lib/angular-ui-utils/ui-utils.js',
        'src/public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'src/public/lib/angular-file-upload/angular-file-upload.js',
        'src/public/lib/owasp-password-strength-test/owasp-password-strength-test.js'
      ],
      tests: ['src/public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'src/modules/*/client/css/*.css'
    ],
    less: [
      'src/modules/*/client/less/*.less'
    ],
    sass: [
      'src/modules/*/client/scss/*.scss'
    ],
    js: [
      'src/modules/*/client/*.js',
      'src/modules/*/client/**/*.js',
      'src/modules/*/client/*/*.js'
    ],
    views: ['src/modules/*/client/views/**/*.html'],
    templates: ['src/build/templates.js']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['src/server.js', 'src/config/**/*.js', 'src/modules/*/server/**/*.js'],
    models: 'src/modules/*/server/models/**/*.js',
    routes: ['src/modules/!(core)/server/routes/**/*.js', 'src/modules/core/server/routes/**/*.js'],
    sockets: 'src/modules/*/server/sockets/**/*.js',
    config: 'src/modules/*/server/config/*.js',
    policies: 'src/modules/*/server/policies/*.js',
    views: 'src/modules/*/server/views/*.html'
  }
};
