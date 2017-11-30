"use strict";

angular.module("core").constant("jQuery", window.jQuery);
angular.module("core").controller("HomeController", ["$scope", "Authentication", "$location", "$http",
	function ($scope, Authentication, $location, $http) {

		$scope.signout = () => {
			$http.get("/sign-out").then(
				() => {
					Authentication.del();
					$location.path("/sign-in");
				}, 
				(err) => {
					console.log(err);
				});      
		};

		$scope.authentication = Authentication.get();
		console.log("User auth home: " + $scope.authentication);
		if ( !$scope.authentication ) {
			$location.path("/sign-in");
		}
		//This provides Authentication context.
		$scope.data = "Home controller data";		   
	}
]);
