const removeChatUserApi = require('../../API/Chat/removeChatUserApi');

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
        let userHaveChat=userHasThisChat(data.chatID, user.chats);
        if (!userHaveChat) {
            outputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
            return;
        }
        if (pv.support.access.level.indexOf(userHaveChat.post)<pv.support.access.level.indexOf(pv.support.access.superAdmin)) {
            outputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
            return;
        }
        removeChatUserApi(data,user,userHaveChat,outputCallBack)

    }
};