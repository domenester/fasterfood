let session = require("electron").session.fromPartition("persist:anysession"),
	path = require("path"),
	logger = require(path.resolve("./config/lib/logger"));

module.exports.getSession = (req, res) => {
	
	session.cookies.get({ name: "user" }, function(error, cookies) {
		if (cookies[0]){
			logger.info("Getting electron cookies user: " + JSON.stringify(cookies[0].value));
			res.json({ user: cookies[0].value });
		} 
		else res.json({user: null});
	});
};

module.exports.setSession = (req, res) => {
	logger.info("Setting electron cookies with user: " + JSON.stringify(req.body.data));
	let expiration = new Date();
	let hour = expiration.getHours();
	expiration.setHours(hour + 6);

	session.cookies.set({
		url: "http://localhost:3001/",
		name: "user",
		value: req.body.data,
		expirationDate: expiration.getTime()
	}, function(err) {
		if(err) logger.info("Error setting user cookie: " + err);
		res.end();
	});	
};