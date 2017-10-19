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
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'modules/users/client/views/sign-up.client.view.html',
		    controller: 'SignUpController'
      })
      .state('sign-in', {
        url: '/sign-in',
        templateUrl: 'modules/users/client/views/sign-in.client.view.html',
		    controller: 'SignInController'
      });
  }
]);
