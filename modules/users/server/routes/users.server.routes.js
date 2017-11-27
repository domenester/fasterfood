"use strict";

// Root routing
const user = require("../controllers/user.server.controller");

module.exports = function (app) {  
	app.post("/sign-up", user.signup);
	app.post("/sign-in", user.signin);
	app.post("/forgot-pass", user.forgot);
	app.post("/reset-pass/:token", user.resetPassword);
	app.get("/user", user.getUser);
	app.get("/sign-out", user.signout);
};
