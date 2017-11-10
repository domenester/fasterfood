'use strict';

var tingoDb = require('tingodb');
var config = require('../config');
const {app} = require('electron');
const chalk = require('chalk');
const electron = app;

var tingodb = tingoDb().Db;

// Initialize Mongoose
module.exports.getCollection = (name) => {
  var tingo = new tingodb(config.db.connectionPath, {});
  return tingo.collection(config.db.path + "/" + name, function (err) {
    // Log Error
    if (err) {
      console.error(chalk.red('Could not connect to TingoDB!'));
      console.log(err);
    } else {
      // Call callback FN
      console.log(chalk.green('Connected to collection: ') + name);
    }
  });
}

// module.exports.crud = {
//   insert: (collection, data, options) => {
//     collection.insert( data , options || {}, function(err, result) {
//       if (err) console.log(err);
//     });
//   },

//   findOne: (collection, data) => {
//     collection.findOne( data, function(err, item){
//       if (err) console.log(err);
//       return item;
//     });
//   }

// };
// module.exports.disconnect = function (cb) {
//   tingodb.disconnect(function (err) {
//     console.info(chalk.yellow('Disconnected from MongoDB.'));
//     cb(err);
//   });
// };