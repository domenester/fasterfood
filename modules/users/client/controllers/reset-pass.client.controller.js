"use strict";
angular.module("users").controller("ResetPassController", ["$scope", "$controller", "$http", "$location", "$stateParams", "Alerts", "Validation",
	function ($scope, $controller, $http, $location, $stateParams, Alerts, Validation) {

		let authService = Validation;
		
		let authenticationController = $scope.$new();
		$controller("AuthenticationController", {$scope : authenticationController });
		$scope.signFieldsPath = authenticationController.filePath;

		$scope.resetPass = (resetPassForm, verb, location) => {
			let newPassword = resetPassForm.password.$viewValue;
			if ( authService.isPasswordValid(newPassword) ) {       
				$http({
					method: verb,
					url: location || $location.path(),
					headers: {"Content-Type": "application/json"},
					data: { 
						password: newPassword,
						token: $stateParams.token
					}
				}).then( 
					() => $location.url("/"),
					(msg) => { 
						Alerts.showAndCloseAlert(Alerts.types.danger, msg.data.message);
						console.log("Error: " + JSON.stringify(msg)); 
					}
				); 
			} 
		};
	}
]);