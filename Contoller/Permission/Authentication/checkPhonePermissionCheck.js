var CheckPhone = require('../../API/Authentication/CheckPhone');
var err = require('../../Model/error');
var warn = require('../../Model/warning');
var User = require('../../Model/user');
var pv = require('../../Other/PublicValue');
var db = require('../../DB/db');
module.exports = {
    check: function (data, user) {
        //check all for chackPhone
        var extraData;

        function callCheckPhone(newUser) {
            return new Promise(async (resolve, reject) => {
                if (user.spam.length > 0) {
                    let date = new Date().getTime();
                    for (let i = 0; i < user.spam.length; i++) {
                        if (user.spam[i].type === 'outApp' && user.spam[i].nextAccessTime > date) {
                            reject(new err(pv.errCode.authentication.user_delete_spam, undefined, {'next_active_time': user.spam[i].nextAccessTime}));
                            return;
                        }
                    }

                }

                const result = await CheckPhone.call(newUser);
                if (extraData !== undefined)
                    result.warning = extraData;
                resolve(result);

            });

        }

        return new Promise(async (resolve, reject) => {
            if (!user) {

                if (!data.hasOwnProperty('country')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {'param': ['country']}).jsonErr());
                }
                else {
                    if (pv.support.country.indexOf(data.country) < 0) {
                        reject(new err(pv.errCode.authentication.country_not_support).jsonErr());
                    }
                }
                // db.createUser(data.phone_number);
                if (!data.hasOwnProperty('language')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {'param': ['language']}).jsonErr());
                }
                else {
                    if (Object.values(pv.support.language).indexOf(data.language) < 0) {
                        extraData = new warn(pv.errCode.authentication.language_not_support).findThisWarning();
                        data.language = pv.defaultValue.language;
                    }
                }

                user = User.CreateNewUser(data);
                user = await db.insertUser(user);
            }
            try {
                const phone=await callCheckPhone(user);
                resolve(phone);
            } catch (e) {
                reject(e);

            }

        });


    }
};

