'use strict';

var express = require('./config/lib/express');
var config = require('./config/config');
var tingodb = require('./config/lib/tingodb');

module.exports.checkAdmin = function checkAdmin(usersCollection, callback) {
	usersCollection.findOne({roles: 'admin'}, function(err, item) {
		if (err) {
			throw new Error(err);
		}
		callback(item);
	});	
};

module.exports.init = function init(cb) {
	tingodb.getCollection('users', function (usersCollection) {
		// Initialize express
		var app = express.init(usersCollection);
		
		if (cb) cb(app, usersCollection);
	});
};

module.exports.start = function start(cb) {

	this.init( (app, usersCollection) => {		
		app.listen(config.server.port, () => {
			// Logging initialization
			console.log('listening on ' + config.server.port);
			this.checkAdmin(usersCollection, cb);
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
