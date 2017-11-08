'use strict';
angular.module('users').controller('SignInController', ['$scope', '$controller',
  function ($scope, $controller) {
    let authenticationController = $scope.$new();
    $controller("AuthenticationController", {$scope : authenticationController });
    $scope.signFieldsPath = authenticationController.filePath;
    $scope.signin = (signInForm, verb, location) => {
      authenticationController.sign(signInForm, verb, location);
    };
  }
]);
