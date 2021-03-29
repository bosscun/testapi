"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailToClient = exports.sendResetPasswordEmail = exports.sendMail = exports.EMAIL_FROM = void 0;
const path = require("path");
exports.EMAIL_FROM = 'noreply@ql6625.fr';
async function sendMail(Email, { to, from, subject, text, html, attachments }) {
    return new Promise((resolve, reject) => {
        Email.send({
            to: to,
            from: from || exports.EMAIL_FROM,
            subject: subject,
            text: text,
            html: html,
            attachments: attachments
        }, function (err, mail) {
            err ? reject(err) : resolve(mail);
        });
    });
}
exports.sendMail = sendMail;
async function sendResetPasswordEmail(Email, info, token) {
    // let url = process.env.NODE_ENV === 'production' ? urlBOProd : process.env.NODE_ENV === 'staging' ? urlBOStaging : 'http://localhost:4200';
    const url = 'http://localhost:3000';
    const link = `${url}/new-password?access_token=${info.accessToken.id}`;
    const html = `<p><b>Bonjour, ${info.username}</b></p>
  <p><b>Si vous avez perdu votre passeport, veuillez cliquer sur ce lien :</b></p>
  <p> ${info.code} </p>
  <p><b>Merci et Bienvenu…</b></p>
	<p>L’équipe Colvemat Management.</p>`;
    return sendMail(Email, {
        to: info.email,
        subject: 'Mot de passe perdu',
        html: html
    }).catch(error => {
        console.log(error);
    });
}
exports.sendResetPasswordEmail = sendResetPasswordEmail;
async function sendEmailToClient(Email, info) {
    const html = `<p><b>Bonjour, ${info.fullNameClient}</b></p>
  <p><b>Votre commande est validée :</b></p>
  <p> ${info.commandeId} </p>
  <p><b>Merci et Bienvenu…</b></p>
  <p>L’équipe Colvemat Management.</p>`;
    // console.log('path', path.resolve(__dirname, '../../uploads/documents/' + info.fileAttachment))
    return sendMail(Email, {
        to: info.email,
        subject: 'Commande validée',
        html: html,
        attachments: info.fileAttachment ? [{
                filename: info.fileAttachment,
                path: path.resolve(__dirname, '../../uploads/documents/' + info.fileAttachment),
                contentType: 'application/pdf'
            }] : undefined
    }).catch(error => {
        console.log(error);
    });
}
exports.sendEmailToClient = sendEmailToClient;
//# sourceMappingURL=sendEmail.js.map