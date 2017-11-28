"use strict";

module.exports = {

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
