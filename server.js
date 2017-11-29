"use strict";

let express = require("./config/lib/express"),
	config = require("./config/config"),
	logger = require("./config/lib/logger"),
	app = express.init();

app.listen(config.server.port, () => {
	// Logging initialization	
	logger.info("listening on " + config.server.port);
});
