'use strict';
// Setting up route
angular.module('users').config(['$routeProvider',
  function ($routeProvider) {
    // Users state routing
    $routeProvider
      .when('/register', {
        templateUrl: 'modules/users/client/views/register.server.view.html',
		    controller: 'Register'
      });
  }
]);
