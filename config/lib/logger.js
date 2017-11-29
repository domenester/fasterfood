let bunyan = require("bunyan"),
	prettyStream = require("bunyan-prettystream"),
	prettyStdOut = new prettyStream(),
	global = require("../global");

prettyStdOut.pipe(process.stdout);

let log = bunyan.createLogger({
	name: "Faster Food",
	streams: [{
		stream: prettyStdOut
	},
	{
		path: global.path.userData + "\\log.txt"
	},
	]
});

module.exports = log;