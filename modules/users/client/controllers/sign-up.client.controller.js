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
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: user
      }).then(function success(res) {
        console.log("USER POSTED.");
      }, function error(res) {
        console.log("ERR POSTED: " + res);
      });
    };
  }
]);
