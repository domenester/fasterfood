'use strict';
const nodemailer = require('nodemailer');

module.exports.sendLinkForResetPassTo = (email, token, host) => {
	nodemailer.createTestAccount((err, account) => {
		var smtpTransport = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: account.user, // generated ethereal user
				pass: account.pass  // generated ethereal password
			}
		});
	
		var mailOptions = {
		from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
		to: email, // list of receivers
		subject: 'Node.js Password Reset',
		text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
			'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
			'http://' + host + '/reset/' + token + '\n\n' +
			'If you did not request this, please ignore this email and your password will remain unchanged.\n'
		};
	
		smtpTransport.sendMail(mailOptions, function(err) {
			console.log('An e-mail has been sent to ' + email + ' with further instructions.');
			return {message: "EMAIL SENT"};
		});	
	});
	
};
