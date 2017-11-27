"use strict";

module.exports.isAuthenticated = function(req,res,next){
	if(req.user) {
		//console.log("isAuth user: " + req.user);
		return next();
	} else {
		console.log("User is not authenticated");
		return;		
	}		
}
