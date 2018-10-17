const deleteChatUserApi = require('../../API/Chat/deleteChatUserApi');

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

        let promiseUserHaveChat = userHasThisChat(data.chatID, user.chats, pv.support.access.admin);
        promiseUserHaveChat.then(userHaveChat => {
            deleteChatUserApi.call(data, user, outputCallBack);
        }).catch(error => {
            outputCallBack(error)
        });



    }
};