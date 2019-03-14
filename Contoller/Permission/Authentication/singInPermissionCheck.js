let err = require('../../Model/error');
let warn = require('../../Model/warning');
let User = require('../../Model/user');
let pv = require('../../Other/PublicValue');
module.exports = {
    check: function (data, user) {
        //check all for checkPhone
        return new Promise(async (resolve, reject) => {

            let extraData = undefined;
            if (!user) {
                return reject(new err(pv.errCode.authentication.phone_number_not_found).jsonErr());
            }
            if (user.spam.length > 0) {
                let date = new Date().getTime();
                for (let i = 0; i < user.spam.length; i++) {
                    if (user.spam[i].type === 'outApp' && user.spam[i].nextAccessTime > date) {
                        return reject(new err(pv.errCode.authentication.user_delete_spam, undefined, {'next_active_time': user.spam[i].nextAccessTime}));
                    }
                }

            }
            if (!data.hasOwnProperty('verify_code')) {
                return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['verify_code']}).jsonErr());
            }
            else {
                if (data.verify_code.toString().length !== pv.defaultValue.verifyCodeLength) {
                    return reject(new err(pv.errCode.invalid_arguments, 'Wrong verification code', {params: ['verify_code']}).jsonErr());
                }
            }
            if (!data.hasOwnProperty('notification_model')) {
                return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['notification_model']}).jsonErr());
            }
            else {
                if (!pv.support.notificationModel.hasOwnProperty(data.notification_model)) {
                    return reject(new err(pv.errCode.authentication.notification_model_not_support).jsonErr());
                }
            }
            if (!data.hasOwnProperty('notification_token')) {
                return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['notification_token']}).jsonErr());
            }
            if (!data.hasOwnProperty('app')) {
                return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['app']}).jsonErr());
            }
            //kamel etelaate appo nagerftimm nagereftim


            data.device.notification = {
                notification_model: data.notification_model,
                notification_token: data.notification_token
            };
            try {
                const result = await require('../../API/Authentication/SingIn')(user).call(data);
                if (extraData !== undefined)
                    result.warning = extraData;
                return resolve(result);
            } catch (e) {
                return reject(e);

            }

        });
    }
};