"use strict";

// Authentication service for user variables
angular.module("users").service("Authentication", ["$cookies", "$http", 
	function ($cookies, $http){

		console.log("COOKIES: " + $cookies.get("user"));

		/** Initializing user Cookie */
		$http.get("/session").then(
			(userData) => {
				console.log("First Cookie Request for UserData: " + JSON.stringify(userData));
				$cookies.put("user", userData);
			}
		);

		this.del = () => {
			$http.delete("/session").then(
				() => {
					$cookies.remove("user", null);
				}
			);
		};
		this.get = () => {
			console.log("COOKIES GET: " + JSON.stringify($cookies.get("user")));
			return $cookies.get("user");
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
