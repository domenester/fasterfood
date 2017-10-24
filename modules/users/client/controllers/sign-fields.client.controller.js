'use strict';
angular.module('users').controller('SignFieldsController', ['$scope', 'LoginFormDatas', '$http', '$location', 'Alerts', 
  function ($scope, LoginFormDatas, $http, $location, Alerts) {
    $scope.rootPath = "modules/users/client/views/";
    $scope.filePath = $scope.rootPath + "sign-fields.client.view.html";

    $scope.updateLoginFormData = (field, value) => {
      LoginFormDatas.set(field, value);
    };

    $scope.email = LoginFormDatas.get('email');
    $scope.password = LoginFormDatas.get('password');

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
        (msg) => {           
          //window.location.href = '/';        
          console.log("Success: " + JSON.stringify(msg)); 
        }, 
        (msg) => { 
          //Alerts.showAndCloseAlert(Alerts.types.danger, msg.data);
          console.log("Error: " + JSON.stringify(msg)); 
        }
      );      
    };
  }
]);

angular.module('users').service('LoginFormDatas', function () {
  let datas = {
    email: '',
    password: ''
  };

  this.get = function (field) {
      return datas[field];
  };

  this.set = function (field, value) {
      datas[field] = value;
  }

  this.reset = function () {
    for(let key in datas) {
      if (datas.hasOwnProperty(key)) datas[key] = '';     
    }
  }
});