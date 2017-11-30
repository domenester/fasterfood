let session = require("electron").session.fromPartition("persist:anysession"),
	path = require("path"),
	logger = require(path.resolve("./config/lib/logger"));

module.exports.delSession = (req, res) => {
	logger.info("Deleting electron cookies user");
	session.cookies.remove("user", "http://localhost:3001/", function(err) {
		if(err) logger.info("Error deleting user cookie: " + err);
		if (res) res.end();
	});
};

module.exports.getSession = (req, res) => {
	
	session.cookies.get({ name: "user" }, function(error, cookies) {
		if ( error ) logger.info("Error getting cookies: " + error);

		logger.info("Cookies got: " + cookies.length);
		if (cookies[0]){
			logger.info("Getting electron cookies user: " + JSON.stringify(cookies[0].value));
			//setSession(cookies[0].value, null);
			res.json({ user: cookies[0].value });
		} 
		else res.json({user: null});
	});
};

let setSession = (data, res) => {
	logger.info("Setting electron cookies with user: " + JSON.stringify(data));
	let expiration = new Date();
	let hour = expiration.getHours();
	expiration.setHours(hour + 6);
	logger.info("Date: " + expiration);
	session.cookies.set({
		url: "http://localhost:3001/",
		name: "user",
		value: data,
		expirationDate: expiration.getTime()
	}, function(err) {
		if(err) logger.info("Error setting user cookie: " + err);
		if (res) res.end();
	});	
};
module.exports.setSession = (req, res) => {
	setSession(req.body.data, res);
};