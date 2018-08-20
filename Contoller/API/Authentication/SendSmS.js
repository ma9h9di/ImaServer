var crypto = require('crypto');
var format = require('biguint-format');
var pv = require('../../Other/PublicValue');
var logd = require('../../Other/Funcion').logd;




module.exports = function (user) {
    var date=new Date().getTime();
    function randomVerifyNumber(qty) {
        return (format(crypto.randomBytes(qty), 'dec')+"").substr(0,pv.defaultValue.verifyCodeLength);
        // return '111111';
    }

    function getSmsBody() {
        return{
            uname:'ma7h5di',
            pass:'12170142',
            from:'+9850001070107027',
            message:pv.string[user.language].verifySmsMessage.replace('{{code}}',user.authentication.validationCode),
            to:[user.phone_number],
            op:'send'
        }


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
        call: function (outputCallBack) {
            checkNeedNewVerifyCode();
            //sendSms
            var request = require('request');
            request.post({
                headers: {'content-type' : 'application/json'},
                url:     pv.defaultValue.sendSmsServiceUrl,
                body:    getSmsBody()
            }, function(error, response, body){
                // console.log(body);
                outputCallBack({'data': {'successful': body[0]===0}});
            });

        },
        checkNeedNewVerifyCode:checkNeedNewVerifyCode

    }
};