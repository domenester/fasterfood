'use strict';

const { app } = require('electron');

const global = {
	path: {
		root: app.getAppPath(),
		userData: app.getPath('userData')
	}
}

module.exports.global = global;
