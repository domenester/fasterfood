"use strict";

let { app } = require("electron");

module.exports = {
	path: {
		//Root path of this application
		root: app.getAppPath(),
		//Path where the folder with collection will be
		userData: app.getPath("userData")
	}
};
