'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.css'
      ],
      js: [
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js'
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
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
      'src/modules/core/client/app/config.js',
      'src/modules/core/client/app/init.js',
      'src/modules/*/client/*.js',
      'src/modules/*/client/**/*.js'
    ],
    views: ['src/modules/*/client/views/**/*.html'],
    templates: ['build/templates.js']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'src/modules/*/server/**/*.js'],
    models: 'src/modules/*/server/models/**/*.js',
    routes: ['src/modules/!(core)/server/routes/**/*.js', 'src/modules/core/server/routes/**/*.js'],
    sockets: 'src/modules/*/server/sockets/**/*.js',
    config: 'src/modules/*/server/config/*.js',
    policies: 'src/modules/*/server/policies/*.js',
    views: 'src/modules/*/server/views/*.html'
  }
};
