const sgMail = require('@sendgrid/mail')
const constants = require('../config/constants');

sgMail.setApiKey('');

exports.send = async (emailTo, subject, content) => {
    const msg = {
        to: emailTo,
        from: constants.SenderEmail,
        subject: subject,
        html: content,
      }
      
    try {
    await sgMail.send(msg);

    return true;
    } catch (error) {
        console.log(error.message || "An error occured while sending the email")

        return false;
    }
}