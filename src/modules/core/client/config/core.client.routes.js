'use strict';

// Setting up route
angular.module('core').config(['$stateProvider',
  function ($stateProvider) {
	console.log("RUNNING");
    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    });
  }
]);
