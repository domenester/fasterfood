'use strict';

var express = require('./config/lib/express');
var config = require('./config/config');
var tingodb = require('./config/lib/tingodb');

module.exports.init = function init(cb) {
	tingodb.connect(function (db) {
		// Initialize express
		var app = express.init(db);
		if (cb) cb(app, db, config);
	});
};

module.exports.start = function start(cb) {

	this.init( (app, db, config) => {
		// Start the app by listening on <port>

		db.insert([{hello:'world_safe1'}, {hello:'world_safe2'}], {w:1}, function(err, result) {			
			// Fetch the document 
			db.findOne({hello:'world_safe2'}, function(err, item) {
				console.log("item.hello: " + item.hello);
			})
		});

		app.listen(config.port, () => {

		// Logging initialization
		console.log('listening on ' + config.port);

		if (cb) cb();

		});
	});
};


// module.exports.start = callback => {
// 	server.get('/', function(request, response){
// 		response.send("Hello!");
// 	});
// 	server.listen(3000);

// 	if(callback) callback();
// };

// module.exports.start = function start(cb){
// 	var express = require('express');
// 	var app = express();
// 	app.get('/', function (req, res) { 
// 		res.send('Hello World') 
// 	});
// 	app.listen(3000);
// 	cb();
// }
