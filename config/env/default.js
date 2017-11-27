"use strict";

const { global } = require("../global");
const path = "db";
module.exports = {
	app: {
		title: "Food-Faster",
		description: "Fast Managment",
		keywords: "node",
		globalPath: global.path.root
	},
	server: {
		host: process.env.HOST || "127.0.0.1",
		port: process.env.PORT || 3001,
	},    
	db: {
		connectionPath: global.path.userData,
		path: path,
		location: global.path.userData + "/" + path,
		uri: "mongodb://localhost",
		options: {
			user: "",
			password: ""
		}
	},
	templateEngine: "swig"
};
