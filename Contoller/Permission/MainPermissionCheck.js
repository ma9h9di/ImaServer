var authenticationPermission = require('./Authentication/AuthenticationMainPermissionCheck');
var logd = require('../Other/Funcion').logd;
var err = require('../Model/error');
var pv = require('../Other/PublicValue');
var db = require('../DB/db');
var TAG = "main";
var callBackAfterUser = function (user) {
    logd(TAG, "check MainPermissionCheck");
    switch (input.method) {
        case pv.api.authentication.checkPhone:
        case pv.api.authentication.sendCode:
        case pv.api.authentication.sendSms:
        case pv.api.authentication.signIn:
        case pv.api.authentication.signUp:
        case pv.api.authentication.logOut:
        case pv.api.authentication.removeSession:
            const authenticationPermissionResult = authenticationPermission.check(input, user, client);
            authenticationPermissionResult.type = pv.apiType.authentication;
            return authenticationPermissionResult;
        default:
            return new err(pv.errCode.method_not_found).jsonErr();
    }
}
module.exports = {

    check: function (input, client) {
        //todo check koliat az ghabil in ke in methode vojod dare age nadare
        //for authentication don`t need
        // user=DB.getUserByPhoneNumber(data.data.phone_number);//
        //baraye tamam method ha be joz signup, signin, sendCode va sendSMS status bayad active bashad
        if (!input.hasOwnProperty('method'))
            return new err(pv.errCode.method_not_found).jsonErr();
        if (!input.hasOwnProperty('data'))
            return new err(pv.errCode.data_not_found).jsonErr();
        var data = input.data;
        var user = false;
        if (pv.permission.notNeedTokenApi.indexOf((input.method)) > -1) {
            if (!data.hasOwnProperty('phone_number'))
                return new err(pv.errCode.invalid_arguments, undefined, {params: ['phone_number']}).jsonErr();
            if (data.phone_number.length > 14)
                return new err(pv.errCode.authentication.phone_not_valid, 'phone number longer than 14').jsonErr();
            if (data.phone_number[0] !== '+')
                return new err(pv.errCode.authentication.phone_not_valid, 'phone number format not valid').jsonErr();
            db.getUserByPhoneNumber(data.phone_number,callBackAfterUser);
        } else {
            if (!data.hasOwnProperty('token'))
                return new err(pv.errCode.token_field_not_found).jsonErr();
            // user=db.getUserByToken(data.token);
            if (user === false) {
                return new err(pv.errCode.token_user_not_found).jsonErr();
            }
        }

    }
}