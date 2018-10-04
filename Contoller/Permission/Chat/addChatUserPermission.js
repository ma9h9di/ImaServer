const addChatUserApi = require('../../API/Chat/addChatUserApi');

const userHasThisChat = require('./getFullChatPermission').userHasThisChat;

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/mongoUtil');

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
        if (!data.hasOwnProperty('limitShowMessageCount')) {
            data.limitShowMessageCount=0;
            //TODO inja bayd bayad warning bedim ke begin khodemon defulto 0 kardim
        }
        let userHaveChat = userHasThisChat(data.chatID, user.chats);
        if (!userHaveChat) {
            outputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
            return;
        }
        if (pv.support.access.level.indexOf(userHaveChat.post) < pv.support.access.level.indexOf(pv.support.access.superAdmin)) {
            outputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
            return;
        }
        addChatUserApi.call(userHaveChat, data, user, outputCallBack);


    }
};