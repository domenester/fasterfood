"use strict";

//handle setupevents as quickly as possible
const setupEvents = require("./installers/setupEvents");
if (setupEvents.handleSquirrelEvent()) {
	// squirrel event handled and app will exit in 1000ms, so don't do anything else
	//eslint-disable-next-line
	return;
}

// const electron = require('electron')
// // Module to control application life.
// const app = electron.app
// const {ipcMain} = require('electron')
// var path = require('path')

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const { app, BrowserWindow } = require("electron");
//eslint-disable-next-line no-unused-vars
let server = require("./server"),
	fs = require("fs"),
	logger = require("./config/lib/logger"),
	global = require("./config/global"),
	config = require("./config/config");

// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
let main, splashScreen;

function createDbFolderIfDontExist( ) {
	if (!fs.existsSync(config.db.location)){
		fs.mkdirSync(config.db.location);
		logger.info("Database folder created sucessfuly.");
	}
}

function startApplication () {
	
	createDbFolderIfDontExist();	

	splashScreen = new BrowserWindow({
		width: 500, 
		height: 300,
		frame: false,
		resizable: false,
		movable: false,
		show: false
	});

	splashScreen.setMenu(null);

	// Create the browser window.
	main = new BrowserWindow({
		width: 800, 
		height: 600,
		minHeight: 320,
		minWidth: 320,
		show: false,
		webPreferences: {
			partition: "persist:anysession"
		}
	});

	/** Disable the menu bar */
	//main.setMenu(null);
	
	splashScreen.once("show", () => {		
		
		//Starting the server, then loads the localhost;
		main.loadURL("http://localhost:3001/");
		main.webContents.on("did-finish-load", function() {
			main.show();
			splashScreen.close();
		});
	});
	
	server.start( () => {
		splashScreen.loadURL("file://" + global.path.root + "/splash.html");
		splashScreen.webContents.on("did-finish-load", function() {
			splashScreen.show();
		});				
	});	

	// Emitted when the window is closed.
	main.on("closed", () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		main = null;
	});

	splashScreen.on("closed", () => {
		splashScreen = null;
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", startApplication);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On macOS it"s common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (main === null) {
		startApplication();
	}
});
