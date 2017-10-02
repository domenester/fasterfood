'use strict';
// Setting up route
angular.module('core').config(['$routeProvider',
  function ($routeProvider) {
    // Home state routing
    $routeProvider
    .when('/', {
      templateUrl: 'modules/core/client/views/home.client.view.html',
      controller: 'HomeController'
    })
    .when('/not-found', {
      templateUrl: 'modules/core/client/views/404.client.view.html'
    })
    .otherwise({redirectTo: '/not-found'});
  }
]);
