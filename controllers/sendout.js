const db = require('../models');
const emailGateway = require('../gateways/email');
const smsGateway = require('../gateways/sms');
const constants = require('../config/constants');



const parseTemplate = (user, templateContent, templateParameters) => {

    templateContent = templateContent.replace('[userName]', user.userName);

    var listOfTemplateProperties = Object.getOwnPropertyNames(templateParameters);

    listOfTemplateProperties.forEach(variable => {
        templateContent = templateContent.replace('['+variable+']', templateParameters[variable])
    });

    return templateContent;
}

exports.send = async (req, res, next) => {
    try {

        const {userId, notificationName, templateParameters} = req.body;
        let users = await db.sequelize.query('SELECT * FROM users where userId = ?', {
                 replacements: [userId],
                 type: db.sequelize.QueryTypes.SELECT
               });

        if(users.length === 0 || users.length >1){
            throw "User error";
        }

        var user = users[0];
        

        let templates = await db.sequelize.query('SELECT * FROM templates where name = ? AND communicationType = ? ORDER BY Id DESC LIMIT 1', {
            replacements: [notificationName, user.communicationPreference],
            type: db.sequelize.QueryTypes.SELECT
          });

        if(templates.length === 0){
          throw "Template not found";
        }

        templateContent = parseTemplate(user, templates[0].content, templateParameters);
  

        if(user.communicationPreference === constants.Sms && user.mobile){
            var isSendoutSuccessful = smsGateway.send(users.mobile, templates[0].subject, templateContent);

            if(isSendoutSuccessful){
                res.status(200).send();
            }
        }

        if(user.communicationPreference === constants.Email && user.email){
            var isSendoutSuccessful = emailGateway.send(user.email, templates[0].subject, templateContent);

            if(isSendoutSuccessful){
                res.status(200).send();
            }
        }

        res.status(500).send({message: "No way found to reach customer"});
    } catch (error) {
        next(error)
    }
}