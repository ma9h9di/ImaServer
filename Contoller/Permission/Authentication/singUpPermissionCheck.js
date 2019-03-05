let err = require('../../Model/error');
let warn = require('../../Model/warning');
let User = require('../../Model/user');
let pv = require('../../Other/PublicValue');
module.exports = {
    check: function (data, user) {
        return new Promise(async (resolve, reject) => {
            //check all for checkPhone
            let extraData = undefined;
            if (!user) {
                reject(new err(pv.errCode.authentication.phone_number_not_found).jsonErr());
            }
            // if (user.status !== 'deactivate') {
            //     outputCallBack(new err(pv.errCode.authentication.user_already_exist).jsonErr());
            //     return;
            // }

            if (user.spam.length > 0) {
                let date = new Date().getTime();
                for (let i = 0; i < user.spam.length; i++) {
                    if (user.spam[i].type === 'outApp' && user.spam[i].nextAccessTime > date) {
                        reject(new err(pv.errCode.authentication.user_delete_spam, undefined, {'next_active_time': user.spam[i].nextAccessTime}));
                    }
                }

            }

            if (!data.hasOwnProperty('token')) {
                reject(new err(pv.errCode.token_field_not_found, undefined, {params: ['token']}).jsonErr());
            } else {
                if (!data.token === user.session[0].token) {
                    reject(new err(pv.errCode.authentication.token_illegal_sing_up).jsonErr());
                }
            }

            if (!data.hasOwnProperty('first_name')) {
                reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['fist_name']}).jsonErr());
            } else {
                if (data.first_name === '') {
                    reject(new err(pv.errCode.invalid_arguments, 'first name can`t empty', {params: ['fist_name']}).jsonErr());
                }
            }
            if (!data.hasOwnProperty('last_name')) {
                reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['last_name']}).jsonErr());
            } else {
                if (data.last_name === '') {
                    reject(new err(pv.errCode.invalid_arguments, 'last name can`t empty', {params: ['last_name']}).jsonErr());
                }
            }
            if (!data.hasOwnProperty('email')) {
                data.email = '';
            } else {
                if (data.email !== '' && data.email.indexOf('@') <= 0) {
                    reject(new err(pv.errCode.invalid_arguments, 'this mail not valid', {params: ['email']}).jsonErr());
                }
            }


            const result = await require('../../API/Authentication/SingUp')(user).call(data);
            if (extraData !== undefined)
                result.warning = extraData;
            resolve(result);
        });

    }
};