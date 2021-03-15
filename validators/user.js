exports.User = (userId, userName, communicationPreference, mobile, email) => {

    var constants = require('../config/constants');
    if(!userId || !userName){
        return false;
    }
    
    if(!mobile && !email){
        return false;
    }

    return communicationPreference.toUpperCase() === constants.Sms || communicationPreference.toUpperCase() === constants.Email;
}