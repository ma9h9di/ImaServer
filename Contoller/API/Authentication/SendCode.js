const pv = require('../../Other/PublicValue');
const logd = require('../../Other/Funcion').logd;
const sendNotification = require('../../Other/sendNotification').sendNotification;

module.exports = function (user) {
    return {
        call: function (outputCallBack) {
            const sendSms = require('./SendSmS')(user);
            sendSms.checkNeedNewVerifyCode();
            //sendCode to app
            for (let i = 0; i < user.session.length; i++) {
                sendNotification(user.session[i].device.notification.notification_token, sendSms.stringTextVerifyCode(), 'verify code', (result) => {
                })
            }


            outputCallBack({'data': {'successful': true}});
        },


    }
};