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
        if (!userHasThisChat(data.chatID, user.chats)) {
            outputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
            return;
        }
        let promise = db.getChatByChatId(chatID);
        //todo reject haye pramis ro ham bayad handel konim
        //value is chat
        promise.then(value => {
            if (value.admins.indexOf(user.userID)<0){//uayor admin in chat nist
                outputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
                return;
            }
            removeChatUserApi.call(value, data,user, outputCallBack);
        });

    }
};