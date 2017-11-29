"use strict";

let isNode = typeof module !== "undefined" && module.exports;
let isAngular = typeof angular !== "undefined";

(
	(isNode, isAngular) => {
		//Definitions
		let authValidation = {
			
			isEmailValid: (email) => {
				//eslint-disable-next-line no-useless-escape
				let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
				return EMAIL_REGEXP.test(email);
			},
			isPasswordValid: (password) => {
				//TODO: Use an API for password validation
				return password.length >= 8 ;
			}
			
		};

		if (isAngular) {
			console.log("isAngular condition");
			angular.module("users").service("Validation", function (){ 
				return authValidation;
			});

		} else if (isNode) {
			console.log("isNode condition");
			module.exports = authValidation;
		}
	}
)(isNode, isAngular);
