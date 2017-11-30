"use strict";

let global = require("../../../../../config/global"),
	passport = require( global.path.root + "/config/lib/passport"),
	tingodb = require( global.path.root + "/config/lib/tingodb"),
	nodemailer = require( global.path.root + "/config/lib/nodemailer"),
	userPassService = require( global.path.root + "/config/services/user-pass"),
	crypto = require("crypto");
	//async = require("async");

console.log( "TINGO PATH: " +  global.path.root + "/config/lib/tingodb");

const forceLogin = (req, res, user) => {
	req.login(user, function(err) {
		if (err) {
			console.log("passport.authenticate - req.login - error: " + err );
			return res.status(500).json({ message: "Falha ao logar" });
		} else {
			console.log("passport.authenticate - req.login - User logged in: " + req.user.email);
			return res.json({ user: req.user });
		}        
	});
};

module.exports.signup = (req, res, next) => { 
	passport.authenticate("signup", {
		failureRedirect: "/sign-up",
		failureFlash : true
	}, function(err, user, info) {      
		if (err) {
			console.log("passport.authenticate - error: " + err );
			return res.status(500).json(info);
		}
		if (!user) {
			console.log("passport.authenticate - failure: " + JSON.stringify(info) );
			return res.status(500).json(info); 
		} else {
			forceLogin(req, res, user);
		}
	}
	)(req, res, next);
};

module.exports.signin = (req, res, next) => { 
	passport.authenticate("signin", {
		failureRedirect: "/sign-in",
		session: true,
	}, function(err, user, info) {      
		if (err) {
			console.log("passport.authenticate - error: " + err );
			return res.status(500).json(info); 
		}  
		if (!user) { 
			console.log("passport.authenticate - !user: " + JSON.stringify(info) );
			return res.status(500).json(info); 
		} else {
			forceLogin(req, res, user);
		}
	}
	)(req, res, next);
};

module.exports.forgot = async (req, res) => {
	//console.log("IN FORGOT");

	let usersCollection = tingodb.getCollection("users");

	/** Checks if user exists with email passed */
	await new Promise((resolve) => {
		usersCollection.findOne({ "email": req.body.email }, function(err, user) {

			if (err) {
				console.log("Error finding user to reset password for email: " + req.body.email);
				return res.status(500).json(err);
			}

			if (!user) {
				console.log("User not found to reset password for email: " + req.body.email);
				return res.status(500).json(err);
			}
			resolve(true);
		});
	});

	/** Generate a token for identify the user */
	let token = await new Promise((resolve, reject) => {
		crypto.randomBytes(20, function(err, buf) {
			if (err) reject(err);
			resolve( buf.toString("hex") );
		});
	});

	/** Create a date tha expires in 1 hour */
	let dateExpiration = Date.now() + 3600000;

	/** Update the user with the token and date expiration */
	await new Promise((resolve) => {
		usersCollection.update( 
			{"email": req.body.email}, 
			{ $set: {resetPasswordToken: token, resetPasswordExpires: dateExpiration } },
			function(err) {
				if (err) {
					console.log("Error saving token and expired date.");
					return res.status(500).json(err);
				}
				resolve(true);
			});
	});

	nodemailer.sendLinkForResetPassTo(req.body.email, token, req.headers.host);

	return res.json({message: "Email enviado."});
};

module.exports.resetPassword = async (req, res) =>{
	let usersCollection = tingodb.getCollection("users");
	/** Checks if user exists with token passed */
	await new Promise((resolve) => {
		usersCollection.update(
			{ "resetPasswordToken": req.body.token }, 
			{ $set: {password: userPassService.generateHash(req.body.password)} },
			function(err, user) {

				if (err) {
					console.log("Error finding user to reset password for token: " + req.body.token);
					return res.status(500).json(err);
				}

				if (!user) {
					console.log("User not found with token: " + req.body.token);
					return res.status(500).json({message: "Token inválido"});
				}
				resolve(true);
			});
	});

	return res.json({message: "Senha alterada com sucesso."});

};

module.exports.signout = (req, res) => {
	console.log("IN SIGNOUT");
	req.logout();
	res.json({ message: true });
};

module.exports.getUser = (req) => {
	console.log("Returning User: " + req.user);
	return req.user || null;
};
