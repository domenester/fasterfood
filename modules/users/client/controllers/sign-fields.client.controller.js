'use strict';
angular.module('users').controller('SignFieldsController', ['$scope', 'LoginFormDatas', '$location',
  function ($scope, LoginFormDatas, $location) {
    $scope.rootPath = "modules/users/client/views/";
    $scope.filePath = $scope.rootPath + "sign-fields.client.view.html";

    $scope.updateLoginFormData = (field, value) => {
      LoginFormDatas.set(field, value);
    };

    $scope.email = LoginFormDatas.get('email');
    $scope.password = LoginFormDatas.get('password');

    $scope.isForgotPassPage = ( $location.path().indexOf('forgot-pass') > 0 ? true : false );
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