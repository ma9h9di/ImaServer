const pv = require('../../Other/PublicValue');
const logd = require('../../Other/Funcion').logd;
const sendNotification = require('../../Other/sendNotification').sendNotification;


module.exports = function (user) {
    return {
        call: function (outputCallBack) {
            const sendSms = require('./SendSmS')(user);
            sendSms.checkNeedNewVerifyCode();
            //sendCode to app
            //todo inja bayad age false shode sms bede
            const promisss=[];
            for (let i = 0; i < user.session.length; i++) {
                promisss.push(sendNotification(user.session[i].device.notification.notification_token, sendSms.stringTextVerifyCode(), 'verify code'));
            }

            Promise.all(promisss).then(value => {
                logd("notiffff",sendSms.stringTextVerifyCode());
                outputCallBack({'data': {'successful': true}});
            }).catch(reason => {
                //todo ino bad bayad un coment konm
                // const sendSms=require('./SendSmS')(user).call(outputCallBack);
                outputCallBack({'data': {'successful': true}});

            })
        },


    }
};