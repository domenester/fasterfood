'use strict';
angular.module('core').constant('jQuery', window.jQuery);
angular.module('core').controller('HomeController', ['$scope',
  function ($scope) {
    // This provides Authentication context.
    $scope.data = "Home controller data";
  }
]);
