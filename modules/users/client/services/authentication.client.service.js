"use strict";

// Authentication service for user variables
angular.module("users").service("Authentication", ["$cookies", "$http", 
	function ($cookies, $http){

		console.log("COOKIES: " + $cookies.get("user"));

		this.del = () => {
			$http.delete("/session").then(
				() => {
					$cookies.remove("user", null);
				}
			);
		};
		this.get = () => {
			let user = $cookies.get("user");
			console.log("Getting angular user cookies: " + JSON.stringify(user));
			if ( !user ) {
				/** Initializing user Cookie */
				$http.get("/session").then(
					(userData) => {
						console.log("First Cookie Request for UserData: " + JSON.stringify(userData));
						$cookies.put("user", userData);
						return userData;
					}
				);
			} else {
				return user;
			}			
		};

		this.set = (userData) => {
			$http.put("/session", {data: userData}).then(
				() => {
					let expiration = new Date();
					let hour = expiration.getHours();
					expiration.setHours(hour + 6);
					$cookies.put("user", userData, {
						expires: expiration
					});
				}
			);		
		};
	}
]);
