const authenticationPermission = require('./Authentication/AuthenticationMainPermissionCheck');
const contactPermission = require('./Contact/contactMainPermissionCheck');
const chatPermission = require('./Chat/chatMainPermissionCheck');
const logd = require('../Other/Funcion').logd;
const err = require('../Model/error');
const pv = require('../Other/PublicValue');
const db = require('../DB/db');


function check(input, client, outputCallBack) {

    var callBackAfterUser = function (user) {
        var date = new Date().getTime();
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
                    user.lastActivityTime = date;
                    user.lastProfileChange = date;
                    db.updateUserByPhoneNumber(user, (newUser) => {
                    });
                    outputCallBack(authenticationPermissionResult);
                });

                return;
            case pv.api.contacts.getAllContacts:
            case pv.api.contacts.updateContact:
            case pv.api.contacts.addContacts:
                if (user === false) {
                    outputCallBack(new err(pv.errCode.token_user_not_found).jsonErr());
                    return;
                }

                contactPermission.check(input, user, (contactPermissionResult) => {
                    contactPermissionResult.type = pv.apiType.contact;
                    user.lastActivityTime = date;
                    user.changeAttribute.push('lastActivityTime');
                    db.updateUserByMongoID(user.changeAttribute,user, (newUser) => {});
                    outputCallBack(contactPermissionResult);
                });

                return;
            case pv.api.chat.getFullChat:
            case pv.api.chat.getChats:
            case pv.api.chat.checkChannelUsername:
            case pv.api.chat.updateChannelUsername:
            case pv.api.chat.setChatInfo:
            case pv.api.chat.addChatUser:
            case pv.api.chat.removeUser:
            case pv.api.chat.deleteChat:
            case pv.api.chat.createGroup:
            case pv.api.chat.createChannel:
            case pv.api.chat.createShop:
            case pv.api.chat.createLink:
            case pv.api.chat.getLink:
            case pv.api.chat.setPin:
            case pv.api.chat.getPin:
                if (user === false) {
                    outputCallBack(new err(pv.errCode.token_user_not_found).jsonErr());
                    return;
                }

                chatPermission.check(input, user, (contactPermissionResult) => {
                    contactPermissionResult.type = pv.apiType.chat;
                    user.lastActivityTime = date;
                    user.changeAttribute.push('lastActivityTime');

                    db.updateUserByMongoID(user.changeAttribute,user, (newUser) => {});
                    outputCallBack(contactPermissionResult);
                });
                return;
            default:
                outputCallBack(new err(pv.errCode.method_not_found).jsonErr());
                return;
        }

    };
    //  TODO check koliat az ghabil in ke in methode vojod dare age nadare
    //  for authentication don`t need
    //  user=DB.getUserByPhoneNumber(data.data.phone_number);//
    //  baraye tamam method ha be joz signup, signin, sendCode va sendSMS status bayad active bashad

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

        db.getUserByToken(data.token, callBackAfterUser);
    }

}

module.exports = {
    check: check
};