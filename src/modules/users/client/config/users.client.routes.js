'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('user.register', {
        url: '/register',
        templateUrl: 'src/modules/users/client/views/register.server.view.html',
		controller: 'Register',
		template: '<ui-view/>'
      });
  }
]);
