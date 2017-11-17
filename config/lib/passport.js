
//https://scotch.io/tutorials/easy-node-authentication-setup-and-local

let LocalStrategy = require('passport-local').Strategy;
let tingodb = require('./tingodb');
let passport = require('passport');
let usersCollection = tingodb.getCollection('users');
const userPassService = require('../services/user-pass');
const authService = require('../../public/services/authentication');

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
	usersCollection.findById(id, function(err, user) {
		done(err, user);
	});
});

let localStrategyConfig = {
	// by default, local strategy uses username and password, we will override with email
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true
};

let localStrategySignUp = (req, email, password, done) => {
	if (authService.isEmailValid(email)) {
		process.nextTick(function() {
			// find a user whose email is the same as the forms email
			// we are checking to see if the user trying to login already exists
			usersCollection.findOne({ 'email' :  email }, function(err, user) {
				// if there are any errors, return the error
				if (err) {
					return done(err);
					console.log("Error finding user with datas: " + JSON.stringify(user));
				}
				// check to see if theres already a user with that email
				if (user) {
					console.log("User with email already exists: " + JSON.stringify(user));
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
							console.log("Error inserting user with datas: " + JSON.stringify(newUser));
							throw err;
						}
						else { 
							console.log("Adding new user: " + JSON.stringify(newUser));
							return done(null, newUser, {
								message: "Email cadastrado com sucesso."
							});						
						}
					});
				}
			});
		});
	} else {
		console.log("Invalid email: " + email);
		return done(null, false, {
			message: "Email inválido."
		});
	}
	
};

let localStrategySignIn = (req, email, password, done) => {
	process.nextTick(function() {
		usersCollection.findOne({ 'email' :  email }, function(err, user) {
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

passport.use('signup', new LocalStrategy( localStrategyConfig, localStrategySignUp) );
passport.use('signin', new LocalStrategy( localStrategyConfig, localStrategySignIn) );

module.exports = passport;
