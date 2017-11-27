"use strict";
angular.module("users").controller("ForgotPassController", ["$scope", "$controller", "$http", "$location", "Alerts",
	function ($scope, $controller, $http, $location, Alerts) {
		let authenticationController = $scope.$new();
		$controller("AuthenticationController", {$scope : authenticationController });
		$scope.signFieldsPath = authenticationController.filePath;
		$scope.isProccessingRequest = false;
		$scope.forgotPass = (forgotPassForm, verb, location) => {
			let email = forgotPassForm.email.$viewValue;
			$scope.isProccessingRequest = true;
			$http({
				method: verb,
				url: location || $location.path(),
				headers: {"Content-Type": "application/json"},
				data: { email: email }
			}).then( 
				(msg) => { 
					Alerts.showAndCloseAlert(Alerts.types.success, msg.data.message); 
					console.log("Error: " + JSON.stringify(msg)); 
					$scope.isProccessingRequest = false;
				},
				(msg) => { 
					Alerts.showAndCloseAlert(Alerts.types.danger, msg.data);
					console.log("Error: " + JSON.stringify(msg)); 
					$scope.isProccessingRequest = false;
				}
			); 
		};
	}
]);