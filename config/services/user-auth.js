"use strict";

let logger = require("../lib/logger");

module.exports.isAuthenticated = function(req,res,next){
	if(req.user) {
		//logger.info("isAuth user: " + req.user);
		return next();
	} else {
		logger.info("User is not authenticated");
		return;		
	}		
};
