'use strict';

//let clientAuthService = require('../../../../public/services/authentication');

angular.module('users').controller('AuthenticationController', ['$scope', 'AuthFormPersist', '$http', '$location', 'Alerts', 
  function ($scope, AuthFormPersist, $http, $location, Alerts) {
    $scope.rootPath = "modules/users/client/views/";
    $scope.filePath = $scope.rootPath + "authentication.client.view.html";    

    $scope.email = AuthFormPersist.get('email');
    $scope.password = AuthFormPersist.get('password');

    $scope.isEmailValid = ($scope.email ? authService.isEmailValid($scope.email) : true);
    $scope.isPasswordValid = ($scope.password ? authService.isPasswordValid($scope.password) : true);

    $scope.updateLoginFormData = (field, value) => {
      AuthFormPersist.set(field, value);
    };

    $scope.fieldOnBlur = (field, value) => {
      switch (field) {
        case 'email': 
          $scope.isEmailValid = authService.isEmailValid($scope.email);
        break;

        case 'password':
          $scope.isPasswordValid = authService.isPasswordValid($scope.password);
        break
      }
    };    

    $scope.isResetPassPage  = ( $location.path().indexOf('reset-pass') > 0 ? true : false );
    $scope.isForgotPassPage = ( $location.path().indexOf('forgot-pass') > 0 ? true : false );

    $scope.sign = (signForm, verb, location) => {
      let email = signForm.email.$viewValue;
      let password = signForm.password.$viewValue;

      let user = {
        email: email,
        password: password
      };

      console.log("HTTP: " + JSON.stringify(user));
      console.log("URL: " + location ||  $location.path());

      $http({
        method: verb,
        url: location || $location.path(),
        headers: {'Content-Type': 'application/json'},
        data: user
      }).then( 
        (msg) => $location.path('/'), 
        (msg) => { 
          Alerts.showAndCloseAlert(Alerts.types.danger, msg.data.message);
          console.log("Error: " + JSON.stringify(msg)); 
        }
      );      
    };
  }
]);
