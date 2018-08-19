var CheckPhone = require('../../API/Authentication/CheckPhone');
var err = require('../../Model/error');
var warn = require('../../Model/warning');
var User = require('../../Model/user');
var pv = require('../../Other/PublicValue');
var db = require('../../DB/db');
module.exports = {
    check: function (data, user, outputCallBack) {
        //check all for chackPhone
        var extraData;

        function callCheckPhone(newUser) {

            if (newUser.spam.length > 0) {
                var mSpam = [];
                for (let i = 0; i < newUser.spam.length; i++) {
                    if (newUser.spam[i].type === 'outApp') {
                        mSpam.push(newUser.spam[i]);
                    }
                }
                if (mSpam.length > 0) {
                    outputCallBack(new err(pv.errCode.authentication.user_delete_spam, undefined, mSpam));
                    return;
                }

            }

            CheckPhone.call(newUser, (result) => {
                if (extraData !== undefined)
                    result.warning = extraData;
                outputCallBack(result);
            });

        }

        if (!user) {

            if (!data.hasOwnProperty('country')) {
                outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {'param': ['country']}).jsonErr());
                return;
            }
            else {
                if (!pv.support.country.hasOwnProperty(data.country)) {
                    outputCallBack(new err(pv.errCode.authentication.country_not_support).jsonErr());
                    return;
                }
            }
            // db.createUser(data.phone_number);
            if (!data.hasOwnProperty('language')) {
                outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {'param': ['language']}).jsonErr());
                return;
            }
            else {
                if (!pv.support.language.hasOwnProperty(data.language)) {
                    extraData = new warn(pv.errCode.authentication.language_not_support).findThisWarning();
                    data.language = pv.defaultValue.language;
                }
            }

            user = User.CreateNewUser(data);
            db.insertUser(user, callCheckPhone);
        }else{
            callCheckPhone(user);
        }

    }
};

