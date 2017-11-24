'use strict';

angular.module('core').constant('jQuery', window.jQuery);
angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location', '$http',
  function ($scope, Authentication, $location, $http) {
    let session = require('electron').remote.session.fromPartition('persist:anysession');
    
    $scope.signout = () => {
      $http.get('/sign-out').then( (data) => {
        Authentication.set(null);
        $location.path('/sign-in');
      });      
    };

    new Promise((resolve, reject) => {
      session.cookies.get({ name: "user" }, function(error, cookies) {
        resolve(cookies[0].value);
      });
    }).then( (user) => {
      $scope.authentication = user;
      console.log('User auth home: ' + $scope.authentication);
      if ( !$scope.authentication ) {
        $location.path('/sign-in');
      }
      //This provides Authentication context.
      $scope.data = "Home controller data";
    });
    
    
  }
]);
