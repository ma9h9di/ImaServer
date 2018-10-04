const deleteChatUserApi = require('../../API/Chat/deleteChatUserApi');

const userHasThisChat = require('./getFullChatPermission').userHasThisChat;

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/mongoUtil');

module.exports = {
    check: function (data, user, outputCallBack) {
        //todo age ro sakhte tedad gp ina bekhaim kari konim jash injas vali flan ke chizi nadarim vase in ghazie 
        if (!data.hasOwnProperty('chatID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
            return;
        }
        if (!userHasThisChat(data.chatID, user.chats)) {
            outputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
            return;
        }


        deleteChatUserApi.call(data,user, outputCallBack);


    }
};