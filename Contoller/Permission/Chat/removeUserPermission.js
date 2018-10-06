const removeChatUserApi = require('../../API/Chat/removeChatUserApi');

const userHasThisChat = require('./chatMainPermissionCheck').userHasThisChat;

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

        let promiseUserHaveChat = userHasThisChat(data.chatID, user.chats,pv.support.access.superAdmin);
        promiseUserHaveChat.then(userHaveChat => {
            removeChatUserApi.call(data,user,userHaveChat,outputCallBack)
        }).catch(error => {
            outputCallBack(error)
        });



    }
};