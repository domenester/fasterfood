"use strict";

angular.module("core").service("Alerts", ["jQuery", function ($) {
	return {
		types: {
			danger: "alert alert-danger",
			success: "alert alert-success",
			info: "alert alert-info",
			warning: "alert alert-warning",
		},
		showAndCloseAlert: (_class, message) => {
			let alertElement = angular.element( document.querySelector("#alert") );
			alertElement.removeClass().addClass(_class);
			alertElement.text(message);
			alertElement.slideDown(200);            
			alertElement.delay(3000).slideUp(200);
		},
	};
}]);