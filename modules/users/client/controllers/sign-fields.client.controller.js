'use strict';
angular.module('users').controller('SignFieldsController', ['$scope', 'LoginFormDatas', 
  function ($scope, LoginFormDatas) {
    $scope.rootPath = "modules/users/client/views/";
    $scope.filePath = $scope.rootPath + "sign-fields.client.view.html";

    $scope.updateLoginFormData = (field, value) => {
      LoginFormDatas.set(field, value);
    };

    $scope.email = LoginFormDatas.get('email');
    $scope.password = LoginFormDatas.get('password');

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
      datas = {
        email: '',
        password: ''
      };
  }
});