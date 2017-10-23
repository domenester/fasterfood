'use strict';
angular.module('users').controller('SignFieldsController', ['$scope', 'LoginFormDatas', '$http', '$location',
  function ($scope, LoginFormDatas, $http, $location) {
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
        (msg) => { console.log("Success: " + JSON.stringify(msg)); }, 
        (msg) => { console.log("Error: " + JSON.stringfy(msg)); }
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