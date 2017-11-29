
//https://scotch.io/tutorials/easy-node-authentication-setup-and-local

let LocalStrategy = require("passport-local").Strategy,
	tingodb = require("./tingodb"),
	passport = require("passport"),
	usersCollection = tingodb.getCollection("users"),
	userPassService = require("../services/user-pass"),
	logger = require("./logger"),
	authValidation = require("../../public/services/validations");

	// used to serialize the user for the session
passport.serializeUser( (user, done) => {
	logger.info("User serialized: " + user.email);
	done(null, user.email);
});

// used to deserialize the user
passport.deserializeUser( (email, done) => {
	usersCollection.findOne( {"email": email} , function(err, user) {
		logger.info("User deserialized: " + user.email);
		done(err, user);
	});
});

let localStrategyConfig = {
	// by default, local strategy uses username and password, we will override with email
	usernameField : "email",
	passwordField : "password",
	passReqToCallback : true
};

let localStrategySignUp = (req, email, password, done) => {
	if (authValidation.isEmailValid(email)) {
		process.nextTick(function() {
			// find a user whose email is the same as the forms email
			// we are checking to see if the user trying to login already exists
			usersCollection.findOne({ "email" :  email }, function(err, user) {
				// if there are any errors, return the error
				if (err) {
					logger.info("Error finding user with datas: " + JSON.stringify(user));
					return done(err);					
				}
				// check to see if theres already a user with that email
				if (user) {
					logger.info("User with email already exists: " + JSON.stringify(user));
					return done(null, false, {
						message: "Email já cadastrado.",
					});
				} else {
					// if there is no user with that email
					// create the user
					let newUser = {
						email,
						password: userPassService.generateHash(password),
					};
					
					usersCollection.insert(newUser, function(err) {
						if (err) {
							logger.info("Error inserting user with datas: " + JSON.stringify(newUser));
							throw err;
						}
						else { 
							logger.info("Adding new user: " + JSON.stringify(newUser));
							return done(null, newUser, {
								message: "Email cadastrado com sucesso."
							});						
						}
					});
				}
			});
		});
	} else {
		logger.info("Invalid email: " + email);
		return done(null, false, {
			message: "Email inválido."
		});
	}
	
};

let localStrategySignIn = (req, email, password, done) => {
	process.nextTick(function() {
		usersCollection.findOne({ "email" :  email }, function(err, user) {
			// if there are any errors, return the error before anything else
			if (err)
				return done(err);

			// if no user is found, return the message
			if (!user) {
				return done(null, false, {
					message: "Verifique se os dados estão corretos."
				});
			}
			// if the user is found but the password is wrong
			if (!userPassService.validPassword(password, user.password))
				return done(null, false, {
					message: "Verifique se os dados estão corretos."
				});
				
			// all is well, return successful user
			return done(null, user);
		});
	});
};

passport.use("signup", new LocalStrategy( localStrategyConfig, localStrategySignUp) );
passport.use("signin", new LocalStrategy( localStrategyConfig, localStrategySignIn) );

module.exports = passport;
