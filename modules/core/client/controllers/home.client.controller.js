'use strict';
angular.module('core').constant('jQuery', window.jQuery);
angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
  function ($scope, Authentication, $location) {
    $scope.authentication = Authentication.get();
    if ( !$scope.authentication ) {
      $location.path('/sign-in');
    }
    // This provides Authentication context.
    $scope.data = "Home controller data";
  }
]);
