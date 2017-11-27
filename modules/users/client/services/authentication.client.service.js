"use strict";

// Authentication service for user variables
angular.module("users").service("Authentication", function (){
	let session = require("electron").remote.session;
	let ses = session.fromPartition("persist:anysession");
	let user;

	ses.cookies.get({ name: "user" }, function(error, cookies) {
		if (cookies[0]) user = cookies[0].value;      
	});

	this.get = () => {
	//return user;
		ses.cookies.get({ name: "user" }, function(error, cookies) {
			if (cookies[0]) user = cookies[0].value;
			return user;
		});
	};

	this.set = (userData) => {
		console.log("Setting cookies with user: " + JSON.stringify(userData));
		let expiration = new Date();
		let hour = expiration.getHours();
		expiration.setHours(hour + 6);

		ses.cookies.set({
			url: "http://localhost:3001/",
			name: "user",
			value: userData,
			expirationDate: expiration.getTime()
		}, function(error) {
			console.log(error);
		});
	//$cookies.put("user", user);
	};
});
