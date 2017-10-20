
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

let localStrategyCallback = (email, password, done) => {
	
	let usersCollection = tingodb.getCollection('users');
	console.log("tingo: " + JSON.stringify(tingodb));
	console.log("col: " + usersCollection);
	process.nextTick(function() {
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
		usersCollection.findOne({ 'email' :  email }, function(err, user) {
			// if there are any errors, return the error
			if (err)
				return done(err);

			// check to see if theres already a user with that email
			if (user) {
				return done(null, false, null);
			} else {

				// if there is no user with that email
				// create the user
				let newUser = {
					email,
					password,
				};

				// save the user
				usersCollection.insert(newUser, function(err) {
					if (err) throw err;
					return done(null, newUser);
				});
			}
		});
	});
}

passport.use('signup', new LocalStrategy( localStrategyConfig, localStrategyCallback) );

module.exports = passport;
