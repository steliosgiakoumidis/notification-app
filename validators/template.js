exports.Template = (name, communicationType, content) => {

    var constants = require('../config/constants'); 
    if(!name || !content || !communicationType){
        return false;
    }

    if(communicationType !== constants.Sms && communicationType !== constants.Email ){
        return false;
    }

    return true;
}