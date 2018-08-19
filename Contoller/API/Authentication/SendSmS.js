var crypto = require('crypto');
var biguint = require('biguint-format');
var pv = require('../../Other/PublicValue');
var logd = require('../../Other/Funcion').logd;


module.exports = function (user) {
    var date=new Date().getTime();
    function randomVerifyNumber(qty) {
        return biguint.format(crypto.randomBytes(qty), 'dec')
    }

    function gnreateNewVerifyCode() {
        var verifyCode = randomVerifyNumber(pv.defaultValue.verifyCodeLength);
        user.authentication.validationCode=verifyCode;
        user.authentication.validationCodeExpire=date+pv.defaultValue.ExpireVerifyCodeTime;
        //db.updateUser(user)
    }

    function checkNeedNewVerifyCode() {
        if (user.authentication.hasOwnProperty('validationCode')&&user.authentication.hasOwnProperty('validationCodeExpire')) {
            if (user.authentication.validationCodeExpire<date)
                gnreateNewVerifyCode();
        }else{
            gnreateNewVerifyCode();
        }
    }



    return {
        call: function () {
            checkNeedNewVerifyCode();
            //sendSms
            return {'data': {'successful': true}};
        },
        checkNeedNewVerifyCode:checkNeedNewVerifyCode

    }
};