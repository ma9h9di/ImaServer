const pv = require('../../Other/PublicValue');
const logd = require('../../Other/Funcion').logd;
const sendNotification = require('../../Other/sendNotification').sendNotification;


module.exports = function (user) {
    return {
        call: async function () {
            return new Promise(async (resolve) => {


                const sendSms = require('./SendSmS')(user);
                sendSms.checkNeedNewVerifyCode();
                //sendCode to app
                //todo inja bayad age false shode sms bede
                const promisss = [];
                for (let i = 0; i < user.session.length; i++) {
                    promisss.push(sendNotification(user.session[i].device.notification.notification_token, sendSms.stringTextVerifyCode(), 'verify code'));
                }
                try {
                    await promisss;
                    logd("notiffff", sendSms.stringTextVerifyCode());
                    resolve({'data': {'successful': true}});
                } catch (e) {
                    await require('./SendSmS')(user).call();
                    resolve({'data': {'successful': true}});
                }

            })
        },


    }
};