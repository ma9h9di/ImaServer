var err = require('../../Model/error');
var warn = require('../../Model/warning');
var User = require('../../Model/user');
var pv = require('../../Other/PublicValue');
module.exports = {
    check: function (data, user, outputCallBack) {
        //check all for checkPhone
        var extraData = undefined;
        if (!user) {
            outputCallBack(new err(pv.errCode.authentication.phone_number_not_found).jsonErr());
            return;
        }
        if (user.status!=='deactivate') {
            outputCallBack(new err(pv.errCode.authentication.user_already_exist));
            return;
        }

        if (user.spam.length > 0) {
            let date = new Date().getTime();
            for (let i = 0; i < user.spam.length; i++) {
                if (user.spam[i].type === 'outApp' && user.spam[i].nextAccessTime > date) {
                    outputCallBack(new err(pv.errCode.authentication.user_delete_spam, undefined, {'next_active_time': user.spam[i].nextAccessTime}));
                    return;
                }
            }

        }

        if (!data.hasOwnProperty('token')) {
            outputCallBack(new err(pv.errCode.token_field_not_found, undefined, {params: ['token']}).jsonErr());
            return;
        } else {
            if (!data.token === user.session[0].token) {
                outputCallBack(new err(pv.errCode.authentication.token_illegal_sing_up).jsonErr());
                return;
            }
        }

        if (!data.hasOwnProperty('first_name')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['fist_name']}).jsonErr());
            return;
        } else {
            if (data.first_name === '') {
                outputCallBack(new err(pv.errCode.invalid_arguments, 'first name can`t empty', {params: ['fist_name']}).jsonErr());
                return;
            }
        }
        if (!data.hasOwnProperty('last_name')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['last_name']}).jsonErr());
            return;
        } else {
            if (data.last_name === '') {
                outputCallBack(new err(pv.errCode.invalid_arguments, 'last name can`t empty', {params: ['last_name']}).jsonErr());
                return;
            }
        }
        if (!data.hasOwnProperty('email')) {
            data.email = '';
        } else {
            if (data.email!==''&&data.email.indexOf('@') <= 0) {
                outputCallBack(new err(pv.errCode.invalid_arguments, 'this mail not valid', {params: ['email']}).jsonErr());
                return;
            }
        }


        require('../../API/Authentication/SingUp')(user).call(data, (result) => {
            if (extraData !== undefined)
                result.warning = extraData;
            outputCallBack(result);
        });
    }
};