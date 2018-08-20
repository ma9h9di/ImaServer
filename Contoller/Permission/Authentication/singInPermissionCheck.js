var err = require('../../Model/error');
var warn = require('../../Model/warning');
var User = require('../../Model/user');
var pv = require('../../Other/PublicValue');
module.exports = {
    check: function (data, user,outputCallBack) {
        //check all for checkPhone
        var extraData=undefined;
        if (!user) {
            outputCallBack(new err(pv.errCode.authentication.phone_number_not_found).jsonErr());
            return;
        }
        if (user.spam.length > 0) {
            let date=new Date().getTime();
            for (let i = 0; i < user.spam.length; i++) {
                if (user.spam[i].type === 'outApp' && user.spam[i].nextAccessTime > date) {
                    outputCallBack(new err(pv.errCode.authentication.user_delete_spam, undefined, {'next_active_time': user.spam[i].nextAccessTime}));
                    return;
                }
            }

        }
        if (!data.hasOwnProperty('verify_code')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['verify_code']}).jsonErr());
            return;
        }
        else{
            if (data.verify_code.toString().length!==pv.defaultValue.verifyCodeLength){
                outputCallBack( new err(pv.errCode.invalid_arguments, undefined, {params: ['verify_code']}).jsonErr());
                return;
            }
        }
        if (!data.hasOwnProperty('notification_model')) {
            outputCallBack( new err(pv.errCode.arguments_not_found, undefined, {params: ['notification_model']}).jsonErr());
            return;
        }
        else{
            if(!pv.support.notificationModel.hasOwnProperty(data.notification_model)){
                outputCallBack( new err(pv.errCode.authentication.notification_model_not_support).jsonErr());
                return;
            }
        }
        if (!data.hasOwnProperty('notification_token')) {
            outputCallBack( new err(pv.errCode.arguments_not_found, undefined, {params: ['notification_token']}).jsonErr());
            return;
        }
        if (!data.hasOwnProperty('app')) {
            outputCallBack( new err(pv.errCode.arguments_not_found, undefined, {params: ['app']}).jsonErr());
            return;
        }
        //kamel etelaate appo nagerftimm nagereftim



        data.device.notification={
            notification_model:data.notification_model,
            notification_token:data.notification_token
        };

        require('../../API/Authentication/SingIn')(user).call(data,(result) => {
            if (extraData !== undefined)
                result.warning = extraData;
            outputCallBack(result);
        });
    }
};