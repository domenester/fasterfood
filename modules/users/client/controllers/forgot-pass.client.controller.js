'use strict';
angular.module('users').controller('ForgotPassController', ['$scope', '$controller',
  function ($scope, $controller) {
    let authenticationController = $scope.$new();
    $controller("AuthenticationController", {$scope : authenticationController });
    $scope.signFieldsPath = authenticationController.filePath;
  }
]);