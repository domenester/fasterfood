"use strict";

angular.module("core").constant("jQuery", window.jQuery);
angular.module("core").controller("HomeController", ["$scope", "Authentication", "$location", "$http",
	function ($scope, Authentication, $location, $http) {
		let session = require("electron").remote.session.fromPartition("persist:anysession");

		$scope.signout = () => {
			$http.get("/sign-out").then( (data) => {
				Authentication.set(null);
				$location.path("/sign-in");
			});      
		};

		// let userData = (function * (){
		//   session.cookies.get({ name: "user" }, function(error, cookies) {
		//     if (cookies[0]) yield cookies[0].value;      
		//   });
		// })(); 
		// Promise.resolve(
		//   new Promise((resolve, reject) => {
		//     session.cookies.get({ name: "user" }, function(error, cookies) {
		//       if (cookies[0]) resolve(cookies[0].value);
		//       else reject("User not found in cookies");
		//     });
		//   })
		// );

		// session.cookies.get({ name: "user" }, function(error, cookies) {
		//   if (cookies[0]) userData = cookies[0].value;
		//   else userData = false;
		// });

		//console.log("userData: " + userData);

		new Promise((resolve, reject) => {
			session.cookies.get({ name: "user" }, function(error, cookies) {
				if (cookies[0]) resolve(cookies[0].value);
				else reject("User not found in cookies");
			});
		}).then( 
			(user) => {
				$scope.authentication = user;
				console.log("User auth home: " + $scope.authentication);
				if ( !$scope.authentication ) {
					$location.path("/sign-in");
				}
				//This provides Authentication context.
				$scope.data = "Home controller data";
			},
			(err) => {
				$location.path("/sign-in");
			});    
	}
]);
