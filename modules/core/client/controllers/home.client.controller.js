"use strict";

angular.module("core").constant("jQuery", window.jQuery);
angular.module("core").controller("HomeController", ["$scope", "Authentication", "$location", "$http", "$cookies",
	function ($scope, Authentication, $location, $http, $cookies) {

		$scope.signout = () => {
			$http.get("/sign-out").then(
				() => {
					Authentication.set(null);
					$location.path("/sign-in");
				}, 
				(err) => {
					console.log(err);
				});      
		};

		$scope.authentication = $cookies.get("user");//Authentication.get();
		console.log("User auth home: " + $scope.authentication);
		if ( !$scope.authentication ) {
			$location.path("/sign-in");
		}
		//This provides Authentication context.
		$scope.data = "Home controller data";		   
	}
]);
