const createLinkApi = require('../../API/Chat/createLinkApi');

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
        if (pv.support.access.level.indexOf(userHaveChat.post)<pv.support.access.level.indexOf(pv.support.access.superAdmin)) {
            outputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
            return;
        }
        if (!data.hasOwnProperty('link')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['link']}).jsonErr());
            return;
        }
        if ((data.link+'').length<pv.support.minLinkSize) {
            outputCallBack(new err(pv.errCode.chat.link_size_problem).jsonErr());
            return;
        }

        createLinkApi.call(data,user, outputCallBack);


    }
};