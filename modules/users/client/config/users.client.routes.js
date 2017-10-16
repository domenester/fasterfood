'use strict';
// Setting up route
angular.module('users').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    
    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise('/not-found');

    // $urlRouterProvider.otherwise(function ($injector, $location) {
    //   $state = $injector.get('$state');
    //   $state.go('not-found');
    // });

    // Users state routing
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'modules/users/client/views/register.client.view.html',
		    controller: 'Register'
      });
  }
]);
