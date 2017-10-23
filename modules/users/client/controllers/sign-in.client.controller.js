'use strict';
angular.module('users').controller('SignInController', ['$scope', '$controller',
  function ($scope, $controller) {
    let signFieldsController = $scope.$new();
    $controller("SignFieldsController", {$scope : signFieldsController });
    $scope.signFieldsPath = signFieldsController.filePath;
    $scope.signin = (signInForm, verb, location) => {
      signFieldsController.sign(signInForm, verb, location);
    };
  }
]);
