const setPinApi = require('../../API/Chat/setPinApi');

const userHasThisChat = require('./getFullChatPermission').userHasThisChat;

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user, outputCallBack) {
        if (!data.hasOwnProperty('chatID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
            return;
        }
        let userHaveChat=userHasThisChat(data.chatID, user.chats);
        if (!userHaveChat) {
            outputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
            return;
        }
        if (!data.hasOwnProperty('pinState')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['pinState']}).jsonErr());
            return;
        }

        setPinApi.call(data,user, outputCallBack);


    }
};