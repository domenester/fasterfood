'use strict';
angular.module('users').controller('SignUpController', ['$scope', '$controller', '$http', '$location',
  function ($scope, $controller, $http, $location) {
    let signFieldsController = $scope.$new();
    $controller("SignFieldsController", {$scope : signFieldsController });
    $scope.signFieldsPath = signFieldsController.filePath;

    $scope.signup = (signUpForm) => {
      let email = signUpForm.email.$viewValue;
      let password = signUpForm.password.$viewValue;

      let user = {
        email: email,
        password: password
      };

      $http({
        method: 'POST',
        url: $location.path(),
        headers: {'Content-Type': 'application/json'},
        data: user
      });
    };
  }
]);
