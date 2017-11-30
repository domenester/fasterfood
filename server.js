"use strict";

module.exports.start = (cb) => {
	let express = require("./config/lib/express"),
		config = require("./config/config"),
		logger = require("./config/lib/logger"),
		app = express.init();

	app.listen(config.server.port, () => {
		// Logging initialization	
		logger.info("listening on " + config.server.port);
		if (cb) cb();
	});
};
