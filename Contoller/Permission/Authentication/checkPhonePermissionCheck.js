var CheckPhone = require('../../API/Authentication/CheckPhone');
var err = require('../../Model/error');
var warn = require('../../Model/warning');
var User = require('../../Model/user');
var pv = require('../../Other/PublicValue');
module.exports = {
    check: function (data, user) {
        //check all for chackPhone
        var extraData;
        if (!user) {

            if (!data.hasOwnProperty('country'))
                return new err(pv.errCode.arguments_not_found, undefined, {'param': ['country']}).jsonErr();
            else {
                if (!pv.support.country.hasOwnProperty(data.country))
                    return new err(pv.errCode.authentication.country_not_support).jsonErr();
            }
            // db.createUser(data.phone_number);
            if (!data.hasOwnProperty('language'))
                return new err(pv.errCode.arguments_not_found, undefined, {'param': ['language']}).jsonErr();
            else {
                if (!pv.support.language.hasOwnProperty(data.language)) {
                    extraData = new warn(pv.errCode.authentication.language_not_support).findThisWarning();
                    data.language = pv.defaultValue.language;
                }
            }
            // db.createUser(data.phone_number);
            user = User.CreateNewUser(data)
        }

        if (user.spam.length > 0) {
            var mSpam = [];
            for (let i = 0; i < user.spam.length; i++) {
                if (user.spam[i].type === 'outApp') {
                    mSpam.push(user.spam[i]);
                }
            }
            if (mSpam.length > 0) {
                return new err(pv.errCode.authentication.user_delete_spam, undefined, mSpam);
            }

        }

        var result = CheckPhone.call(user);
        if (extraData!==undefined)
            result.warning = extraData;
        return result;
    }
};

