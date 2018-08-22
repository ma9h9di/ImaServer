var authenticationPermission = require('./Authentication/AuthenticationMainPermissionCheck');
var logd = require('../Other/Funcion').logd;
var err = require('../Model/error');
var pv = require('../Other/PublicValue');
var db = require('../DB/db');
var TAG = "main";

module.exports = {

    check: function (input, client, outputCallBack) {
        var callBackAfterUser = function (user) {
            // logd('enter callBackAfterUser', user);
            switch (input.method) {
                case pv.api.authentication.checkPhone:
                case pv.api.authentication.sendCode:
                case pv.api.authentication.sendSms:
                case pv.api.authentication.signIn:
                case pv.api.authentication.signUp:
                case pv.api.authentication.logOut:
                case pv.api.authentication.removeSession:
                    authenticationPermission.check(input, user, client, (authenticationPermissionResult) => {
                        authenticationPermissionResult.type = pv.apiType.authentication;
                        let date=new Date().getTime();
                        user.lastActivityTime=date;
                        user.lastProfileChange=date;
                        db.updateUserByPhoneNumber(user, (newUser) => {
                        });
                        outputCallBack(authenticationPermissionResult);
                    });

                    return;
                default:
                    outputCallBack(new err(pv.errCode.method_not_found).jsonErr());
                    return;
            }

        };
        //todo check koliat az ghabil in ke in methode vojod dare age nadare
        //for authentication don`t need
        // user=DB.getUserByPhoneNumber(data.data.phone_number);//
        //baraye tamam method ha be joz signup, signin, sendCode va sendSMS status bayad active bashad
        if (!input.hasOwnProperty('method')) {
            outputCallBack(new err(pv.errCode.method_not_found).jsonErr());
            return;
        }
        if (!input.hasOwnProperty('data')) {
            outputCallBack(new err(pv.errCode.data_not_found).jsonErr());
            return;
        }
        var data = input.data;
        var user = false;
        if (pv.permission.notNeedTokenApi.indexOf((input.method)) > -1) {
            if (!data.hasOwnProperty('phone_number')) {
                outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['phone_number']}).jsonErr());
                return;
            }
            if (data.phone_number.length > 14) {
                outputCallBack(new err(pv.errCode.authentication.phone_not_valid, 'phone number longer than 14').jsonErr());
                return;
            }
            if (data.phone_number.length < 6) {
                outputCallBack(new err(pv.errCode.authentication.phone_not_valid, 'phone number less than 6').jsonErr());
                return;
            }
            if (data.phone_number[0] !== '+') {
                outputCallBack(new err(pv.errCode.authentication.phone_not_valid, 'phone number format not valid').jsonErr());
                return;
            }
            logd('after enter db', db);
            db.getUserByPhoneNumber(data.phone_number, callBackAfterUser);
            logd('before enter db');
            return;
        } else {
            if (!data.hasOwnProperty('token')) {
                outputCallBack(new err(pv.errCode.token_field_not_found).jsonErr());
                return;
            }
            // user=db.getUserByToken(data.token);
            if (user === false) {
                outputCallBack(new err(pv.errCode.token_user_not_found).jsonErr());
                return;
            }
        }

    }
}