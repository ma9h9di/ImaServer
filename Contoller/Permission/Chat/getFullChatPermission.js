const getFullChatApi = require('../../API/Chat/getFullChatApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');
const USER_JOINED_CHAT = 5698;


module.exports = {
    check: function (data, user, outputCallBack, userHasThisChat) {

        if (!data.hasOwnProperty('chatID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
            return;
        }

        let chatID = data.chatID;

        const userHasThisChatPromise = userHasThisChat(chatID, user.chats);
        userHasThisChatPromise.then(chatInUserChat => {
            getFullChatApi.callByInfoChat(chatInUserChat, outputCallBack);
        }).catch(error => {
            const promise = db.getChatByChatId(chatID);
            promise.then((value) => {

                if (!value) {
                    //do error chat_not_found ezafe nashode
                    outputCallBack(new err(pv.errCode.chat.chat_not_found).jsonErr());
                    return;
                }
                if (!value.public) {
                    outputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
                    return;
                }
                value.accessLevel= pv.support.access.member;
                getFullChatApi.callByFullChat(value, outputCallBack);
            });
        });


    }
};