const removeChatUserApi = require('../../API/Chat/removeChatUserApi');

const userHasThisChat = require('./chatMainPermissionCheck').userHasThisChat;

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data, user, outputCallBack) {
        if (!data.hasOwnProperty('chatID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
            return;
        }
        if (!data.hasOwnProperty('userId')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['userId']}).jsonErr());
            return;
        }
        const promiseUser = db.getUserByID(data.userID);
        promiseUser.then(userRemoveded => {
            const promiseUserWorkerHaveChat = userHasThisChat(data.chatID, user.chats);
            const promiseUserRemovededHaveChat = userHasThisChat(data.chatID, userRemoveded.chats);
            //2 ta user ozve bashan
            Promise.all([promiseUserWorkerHaveChat, promiseUserRemovededHaveChat]).then(values => {
                if (pv.support.access.accessLevel.indexOf(values[0].post) >= pv.support.access.accessLevel.indexOf(pv.support.access.admin)
                    && pv.support.access.accessLevel.indexOf(values[0].post) >= pv.support.access.accessLevel.indexOf(values[1].post)) {
                    removeChatUserApi.call(data, outputCallBack)
                }else{
                    outputCallBack(new err(pv.errCode.chat.access_level_denied).jsonErr());
                }
            }).catch(error => {
                outputCallBack(error)
            });
        }).catch(error => {
            outputCallBack(error)
        })



    }
};