const crypto = require('crypto');
const format = require('biguint-format');
const pv = require('../../Other/PublicValue');
const logd = require('../../Other/Funcion').logd;


module.exports = function (user) {
    const date = new Date().getTime();

    function randomVerifyNumber(qty) {
        return (format(crypto.randomBytes(qty), 'dec') + "").substr(0, pv.defaultValue.verifyCodeLength);
        // return '11111';
    }

    function getSmsBody() {
        return {
            uname: 'ma7h5di',
            //todo in bayad 2 vardashte beshe
            pass: '12170142',
            from: '+98100020400',
            message: pv.string[user.language].verifySmsMessage.replace('{{code}}', user.authentication.validationCode),
            to: [user.phone_number],
            op: 'send'
        };


    }

    function gnreateNewVerifyCode() {
        user.authentication.validationCode = randomVerifyNumber(pv.defaultValue.verifyCodeLength);
        user.authentication.validationCodeExpire = date + pv.defaultValue.ExpireVerifyCodeTime;

    }

    function checkNeedNewVerifyCode() {
        if (user.authentication.hasOwnProperty('validationCode') && user.authentication.hasOwnProperty('validationCodeExpire')) {
            if (user.authentication.validationCodeExpire < date + 500)
                gnreateNewVerifyCode();
        } else {
            gnreateNewVerifyCode();
        }
    }


    return {
        stringTextVerifyCode: () => {
            return pv.string[user.language].verifySmsMessage.replace('{{code}}', user.authentication.validationCode);
        },
        call: function () {
            return new Promise(async resolve => {


                checkNeedNewVerifyCode();
                //sendSms
                const request = require('request');
                const option = {
                    headers: {'content-type': 'application/json'},
                    url: pv.defaultValue.sendSmsServiceUrl,
                    body: JSON.stringify(getSmsBody())
                };
                console.log(option);
                request.post(option, function (error, response, body) {
                    // console.log(response);
                    console.log(error);
                    body = JSON.parse(body);
                    console.log(body);
                    //todo in bayad beshe 0
                    resolve({'data': {'successful': (body[0] + '') === (0 + '')}});
                });
            });
        },
        checkNeedNewVerifyCode: checkNeedNewVerifyCode

    }
};