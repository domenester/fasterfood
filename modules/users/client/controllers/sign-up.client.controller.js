"use strict";
angular.module("users").controller("SignUpController", ["$scope", "$controller", 
	function ($scope, $controller) {
		let authenticationController = $scope.$new();
		$controller("AuthenticationController", {$scope : authenticationController });
		$scope.signFieldsPath = authenticationController.filePath;
		$scope.signup = (signUpForm, verb, location) => {
			authenticationController.sign(signUpForm, verb, location);
		};
	}
]);
