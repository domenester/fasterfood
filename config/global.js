'use strict';

const { app } = require('electron');

const global = {
	path: {
		//Root path of this application
		root: app.getAppPath(),
		//Path where the folder with collection will be
		userData: app.getPath('userData')
	}
}

module.exports.global = global;
