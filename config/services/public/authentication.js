'use strict';

const authService = {

    isEmailValid: (email) => {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        return EMAIL_REGEXP.test(email);
    },
    isPasswordValid: (password) => {
        return password.length > 8 ;
    }
    
};

module.exports = authService;