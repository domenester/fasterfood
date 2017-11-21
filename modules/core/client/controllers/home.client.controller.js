'use strict';
angular.module('core').constant('jQuery', window.jQuery);
angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
  function ($scope, Authentication, $location) {
    console.log('Authentication.user: ' + Authentication.user)
    if ( !Authentication.user ) {
      $location.path('/sign-in');
    }
    // This provides Authentication context.
    $scope.data = "Home controller data";
  }
]);
