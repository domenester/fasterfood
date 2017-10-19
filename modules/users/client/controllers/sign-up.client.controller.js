'use strict';
angular.module('users').controller('SignUpController', ['$scope', '$controller',
  function ($scope, $controller) {
    let signFieldsController = $scope.$new();
    $controller("SignFieldsController", {$scope : signFieldsController });
    $scope.signFieldsPath = signFieldsController.filePath;
  }
]);
