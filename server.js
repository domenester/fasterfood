'use strict';

var express = require('./config/lib/express');
var config = require('./config/config');
var tingodb = require('./config/lib/tingodb');
let usersCollection = tingodb.getCollection('users');

let app = express.init(usersCollection);

app.listen(config.server.port, () => {
	// Logging initialization
	console.log('listening on ' + config.server.port);
});
