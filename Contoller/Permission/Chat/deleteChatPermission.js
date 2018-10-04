const deleteChatUserApi = require('../../API/Chat/deleteChatUserApi');

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
        let userHaveChat = userHasThisChat(data.chatID, user.chats);
        if (!userHaveChat) {
            outputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
            return;
        }
        if (pv.support.access.level.indexOf(userHaveChat.post) < pv.support.access.level.indexOf(pv.support.access.admin)) {
            outputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
            return;
        }

        
        deleteChatUserApi.call(data,user, outputCallBack);


    }
};