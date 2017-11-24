'use strict';

// Authentication service for user variables
angular.module('users').service('Authentication', ['$cookies', 
  function ($cookies){
    
    let user = $cookies.get('user');

    this.get = () => {
      return user;
    };

    this.set = (user) => {
      $cookies.put('user', user);
    };
  }
]);
