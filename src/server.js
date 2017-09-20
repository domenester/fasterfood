var express = require('./config/lib/express');
var config = require('./config/config');
var mongoose = require('./config/lib/mongoose');

module.exports.init = cb => {
	mongoose.connect(function (db) {
		// Initialize express
		var app = express.init(db);
		if (cb) cb(app, db, config);
	});
};

module.exports.start = cb => {
	var _this = this;

	_this.init( (app, db, config) => {
		// Start the app by listening on <port>
		app.listen(config.server.port, () => {

		// Logging initialization
		console.log('listening on ' + config.server.port);

		if (cb) cb();

		});
	});
};

module.exports.start = callback => {
	server.get('/', function(request, response){
		response.send("Hello!");
	});
	server.listen(3000);

	if(callback) callback();
};
