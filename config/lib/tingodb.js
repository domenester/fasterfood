"use strict";

let tingoDb = require("tingodb"),
	config = require("../config"),
	logger = require("./logger"),
	chalk = require("chalk");

var tingodb = tingoDb().Db;

// Initialize Mongoose
module.exports.getCollection = (name) => {
	var tingo = new tingodb(config.db.connectionPath, {});
	return tingo.collection(config.db.path + "/" + name, function (err) {
	// Log Error
		if (err) {
			console.error(chalk.red("Could not connect to TingoDB!"));
			logger.info(err);
		} else {
		// Call callback FN
			logger.info(chalk.green("Connected to collection: ") + name);
		}
	});
};

// module.exports.crud = {
//   insert: (collection, data, options) => {
//     collection.insert( data , options || {}, function(err, result) {
//       if (err) logger.info(err);
//     });
//   },

//   findOne: (collection, data) => {
//     collection.findOne( data, function(err, item){
//       if (err) logger.info(err);
//       return item;
//     });
//   }

// };
// module.exports.disconnect = function (cb) {
//   tingodb.disconnect(function (err) {
//     console.info(chalk.yellow("Disconnected from MongoDB."));
//     cb(err);
//   });
// };