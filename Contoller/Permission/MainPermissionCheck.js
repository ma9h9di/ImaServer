const authenticationPermission = require('./Authentication/AuthenticationMainPermissionCheck');
const contactPermission = require('./Contact/contactMainPermissionCheck');
const chatPermission = require('./Chat/chatMainPermissionCheck');
const userPermission = require('./User/userMainPermissionCheck');
const messagePermission = require('./Message/messageMainPermissionCheck');
const logd = require('../Other/Funcion').logd;
const err = require('../Model/error');
const pv = require('../Other/PublicValue');
import {} from "../Permission/User/getChatsInfoPermission";

const db = require('../DB/db');


function userHasThisChat(chatID, chats, accessLevel) {
    accessLevel = accessLevel ? accessLevel : pv.support.access.member;
    return new Promise((resolve, reject) => {
        for (let i = 0; i < chats.length; i++) {
            if (chats[i].chatID.equals(chatID)) {
                if (pv.support.access.accessLevel.indexOf(chats[i].post) < pv.support.access.accessLevel.indexOf(accessLevel)) {
                    reject(new err(pv.errCode.chat.access_denied_chat).jsonErr());
                } else {
                    resolve(chats[i]);
                }
            }
        }
        reject(new err(pv.errCode.chat.access_denied_chat).jsonErr());
    });

}

//TODO *** bayad shecle check kardano avaz konim ye function behesh bedim begim inaro check kon
function callBackAfterUser(user, input, client) {
    return new Promise(async (resolve, reject) => {
        const date = new Date().getTime();
        logd("method is :=====> ", input.method);
        switch (input.method) {
            case pv.api.authentication.checkPhone:
            case pv.api.authentication.sendCode:
            case pv.api.authentication.sendSms:
            case pv.api.authentication.signIn:
            case pv.api.authentication.signUp:
            case pv.api.authentication.logOut:
            case pv.api.authentication.removeSession:
                try {
                    const authenticationPermissionResult = await authenticationPermission.check(input, user, client);
                    authenticationPermissionResult.type = pv.apiType.authentication;
                    if (user) {
                        user.lastActivityTime = date;
                        user.lastProfileChange = date;
                        db.updateUserByPhoneNumber(user);
                    }
                    resolve(authenticationPermissionResult);
                } catch (e) {
                    reject(e);
                }
                break;
            case pv.api.contacts.getAllContacts:
            case pv.api.contacts.updateContact:
            case pv.api.contacts.addContacts:
                try {
                    if (user === false) {
                        reject(new err(pv.errCode.token_user_not_found).jsonErr());
                        break;
                    }
                    const contactPermissionResult = await contactPermission.check(input, user);
                    contactPermissionResult.type = pv.apiType.contact;
                    user.lastActivityTime = date;
                    user.changeAttribute.push('lastActivityTime');
                    db.updateUserByMongoID(user.changeAttribute, user);
                    resolve(contactPermissionResult);
                } catch (e) {
                    reject(e);
                }
                break;
            case pv.api.chat.getFullChat:
            case pv.api.chat.getChats:
            case pv.api.chat.getSortedUpdatedChatList:
            case pv.api.chat.checkChannelUsername:
            case pv.api.chat.updateChannelUsername:
            case pv.api.chat.setChatInfo:
            case pv.api.chat.addChatUser:
            case pv.api.chat.removeUser:
            case pv.api.chat.deleteChat:
            case pv.api.chat.createGroup:
            case pv.api.chat.createChannel:
            case pv.api.chat.createShop:
            case pv.api.chat.setLink:
            case pv.api.chat.getLink:
            case pv.api.chat.setPin://todo
            case pv.api.chat.getPin://todo
                try {
                    if (user === false) {
                        reject(new err(pv.errCode.token_user_not_found).jsonErr());
                        break;
                    }
                    const contactPermissionResult = await chatPermission.check(input, user,userHasThisChat);
                    contactPermissionResult.type = pv.apiType.chat;
                    user.lastActivityTime = date;
                    user.changeAttribute.push('lastActivityTime');
                    db.updateUserByMongoID(user.changeAttribute, user);
                    resolve(contactPermissionResult);
                    break;
                } catch (e) {
                    reject(e);
                }
                break;
            case pv.api.user.getUsersInfo:
            case pv.api.user.getFullUserInfo:
                try {
                    if (user === false) {
                        reject(new err(pv.errCode.token_user_not_found).jsonErr());
                        break;
                    }
                    const contactPermissionResult = await userPermission.check(input, user);
                    contactPermissionResult.type = pv.apiType.user;
                    user.lastActivityTime = date;
                    user.changeAttribute.push('lastActivityTime');
                    db.updateUserByMongoID(user.changeAttribute, user);
                    resolve(contactPermissionResult);
                    break;
                } catch (e) {
                    reject(e);
                }
                break;

            case pv.api.message.sendMessage:
            case pv.api.message.forwardMessages:
            case pv.api.message.deleteMessage:
            case pv.api.message.clearHistory:
            case pv.api.message.sendEmojiOnMessage:
            case pv.api.message.setTyping:
            case pv.api.message.seenMessages:
            case pv.api.message.inChatSearch:
            case pv.api.message.globalSearch:
            case pv.api.message.messageSearch:
            case pv.api.message.pay:
            case pv.api.message.sendSupperTicket:
            case pv.api.message.getMessages:
            case pv.api.message.getFullMessages:
            case pv.api.message.getChangableMessage:
                try {
                    if (user === false) {
                        reject(new err(pv.errCode.token_user_not_found).jsonErr());
                        break;
                    }
                    const contactPermissionResult = await messagePermission.check(input, user,userHasThisChat);
                    contactPermissionResult.type = pv.apiType.message;
                    user.lastActivityTime = date;
                    user.changeAttribute.push('lastActivityTime');
                    db.updateUserByMongoID(user.changeAttribute, user);
                    resolve(contactPermissionResult);
                    break;
                } catch (e) {
                    reject(e);
                }
                break;
            default:
                reject(new err(pv.errCode.method_not_found).jsonErr());
                return;
        }
    });
}

function check(input, client) {
    //  TODO check koliat az ghabil in ke in methode vojod dare age nadare
    //  for authentication don`t need
    //  user=DB.getUserByPhoneNumber(data.data.phone_number);//
    //  baraye tamam method ha be joz signup, signin, sendCode va sendSMS status bayad active bashad
    return new Promise(async (resolve, reject) => {
        try {
            if (!input.hasOwnProperty('method')) {
                reject(new err(pv.errCode.method_not_found).jsonErr());
                return;
            }
            if (!input.hasOwnProperty('data')) {
                reject(new err(pv.errCode.data_not_found).jsonErr());
                return;
            }
            const data = input.data;
            let user = false;
            if (pv.permission.notNeedTokenApi.indexOf((input.method)) > -1) {
                if (!data.hasOwnProperty('phone_number')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['phone_number']}).jsonErr());
                    return;
                }
                if (data.phone_number.length > 14) {
                    reject(new err(pv.errCode.authentication.phone_not_valid, 'phone number longer than 14').jsonErr());
                    return;
                }
                if (data.phone_number.length < 6) {
                    reject(new err(pv.errCode.authentication.phone_not_valid, 'phone number less than 6').jsonErr());
                    return;
                }
                if (data.phone_number[0] !== '+') {
                    reject(new err(pv.errCode.authentication.phone_not_valid, 'phone number format not valid').jsonErr());
                    return;
                }
                logd('after enter db', db);
                user = await db.getUserByPhoneNumber(data.phone_number);
                logd('before enter db');
            } else {
                if (!data.hasOwnProperty('token')) {
                    reject(new err(pv.errCode.token_field_not_found).jsonErr());
                }
                user = await db.getUserByToken(data.token);
            }
            try {
                const apiAnswer = await callBackAfterUser(user, input, client);
                resolve(apiAnswer);
            } catch (e) {
                reject(e);
            }
        } catch (e) {
            reject(new err(pv.errCode.internal_err).jsonErr());
        }
    });


}

module.exports = {
    check: check
};