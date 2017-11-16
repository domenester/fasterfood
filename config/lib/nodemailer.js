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
		from: '"Equipe" <foo@blurdybloop.com>', // sender address
		to: email, // list of receivers
		subject: 'Alterar Senha',
		text: 'Você está recebendo esse email, por que foi solicitado uma alteração de senha para essa conta.\n\n' +
			'Clique no link a segui ou cole-o na barra de endereço do seu navagador para completar o processo.:\n\n' +
			'http://' + host + '/reset-pass/' + token + '\n\n' +
			'Se você não solicitou isso, por favor, ignore esse email que sua senha permanecerá igual.\n'
		};
	
		return smtpTransport.sendMail(mailOptions, function(err, info) {
			if (err) {
				console.log('Error trying send email for forgotten pass.');
				return err;	
			}
			console.log('Preview URL for reset password: %s', nodemailer.getTestMessageUrl(info));
			return true;
		});	
	});
	//diogodomene@gmail.com
};
