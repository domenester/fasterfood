'use strict';

// Authentication service for user variables
angular.module('users').service('Authentication', ['$window', '$http',
  function ($window, $http) {
    //return { user: false };

    let user = $http.get('/user').then( 
      (user) => {
        console.log('userPROMISSE: '+JSON.stringify(user));
        return { user: user };
      }
    );

    return user;
  }
]);
