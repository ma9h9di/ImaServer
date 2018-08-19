var err = require('../../Model/error');
var warn = require('../../Model/warning');
var User = require('../../Model/user');
var pv = require('../../Other/PublicValue');
module.exports = {
    check: function (data, user) {
        //check all for checkPhone
        var extraData=undefined;
        if (!user) {
            return new err(pv.errCode.authentication.phone_number_not_found).jsonErr();
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
        if (!data.hasOwnProperty('verify_code'))
            return new err(pv.errCode.arguments_not_found, undefined, {params: ['verify_code']}).jsonErr();
        else{
            if (data.verify_code.toString().length!==6){
                return new err(pv.errCode.invalid_arguments, undefined, {params: ['verify_code']}).jsonErr();
            }
        }
        if (!data.hasOwnProperty('notification_model'))
            return new err(pv.errCode.arguments_not_found, undefined, {params: ['notification_model']}).jsonErr();
        else{
            if(!pv.support.notificationModel.hasOwnProperty(data.notification_model)){
                return new err(pv.errCode.authentication.notification_model_not_support).jsonErr();
            }
        }
        if (!data.hasOwnProperty('notification_token'))
            return new err(pv.errCode.arguments_not_found, undefined, {params: ['notification_token']}).jsonErr();
        if (!data.hasOwnProperty('app'))
            return new err(pv.errCode.arguments_not_found, undefined, {params: ['app']}).jsonErr();
        //kamel etelaate appo nagerftimm nagereftim



        data.device.notification={
            notification_model:data.notification_model,
            notification_token:data.notification_token
        };
        var result = require('../../API/Authentication/SingIn')(user).call(data);
        if (extraData!==undefined)
            result.warning = extraData;
        return result;
    }
};