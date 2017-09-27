'use strict';

angular.module('core').controller('HomeController', ['$scope',
  function ($scope) {
    // This provides Authentication context.
    $scope.data = "Home controller data";
  }
]);
