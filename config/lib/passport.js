
//https://scotch.io/tutorials/easy-node-authentication-setup-and-local

let LocalStrategy = require('passport-local').Strategy;
let tingodb = require('./tingodb');
let passport = require('passport');

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

let localStrategyConfig = {
	// by default, local strategy uses username and password, we will override with email
	usernameField : 'email',
	passwordField : 'password'
};

let localStrategyCallback = (username, password, done) => {
	console.log("INSIDE PASSPORT");
	//done();
	throw new Error("ERROR INSIDE PASSPORT");
	
	//return done('TESTING PASSPORT');
	// let usersCollection = tingodb.getCollection('users');
	// // asynchronous
	// // User.findOne wont fire unless data is sent back
	// process.nextTick(function() {

	// 	// find a user whose email is the same as the forms email
	// 	// we are checking to see if the user trying to login already exists
	// 	usersCollection.findOne({ 'email' :  email }, function(err, newUser) {
	// 		// if there are any errors, return the error
	// 		if (err)
	// 			return done(err);

	// 		// check to see if theres already a user with that email
	// 		if (user) {
	// 			return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
	// 		} else {

	// 			// if there is no user with that email
	// 			// create the user
	// 			let newUser = {
	// 				email: req.body.email,
	// 				password: req.body.password,
	// 			};

	// 			// save the user
	// 			newUser.save(function(err) {
	// 				if (err)
	// 					throw err;
	// 				return done(null, newUser);
	// 			});
	// 		}
	// 	});
	// });
}

passport.use('signup', new LocalStrategy( localStrategyConfig, localStrategyCallback) );

module.exports = passport;
