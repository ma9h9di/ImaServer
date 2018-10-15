const getLinkApi = require('../../API/Chat/getLinkApi');

const userHasThisChat = require('./chatMainPermissionCheck').userHasThisChat;


const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user, outputCallBack) {
        if (!data.hasOwnProperty('chatID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
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

        let promiseUserHaveChat = userHasThisChat(data.chatID, user.chats,pv.support.access.superAdmin);
        promiseUserHaveChat.then(value => {
            getLinkApi.call(data,user, outputCallBack);
        }).catch(error => {
            outputCallBack(error)
        });




    }
};