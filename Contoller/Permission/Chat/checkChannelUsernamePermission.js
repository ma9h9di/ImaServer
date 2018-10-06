const checkChannelUsernameApi = require('../../API/Chat/checkChannelUsernameApi');
const userHasThisChat = require('./chatMainPermissionCheck').userHasThisChat;

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

function checkPermissionCanBeUpdateUserName(data, user, ErrOutputCallBack, successfulOutputCallBack) {
    if (!data.hasOwnProperty('chatID')) {
        ErrOutputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
        return;
    }
    if (!data.hasOwnProperty('newUsername')) {
        ErrOutputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['newUsername']}).jsonErr());
        return;
    }

    let promiseUserHaveChat = userHasThisChat(data.chatID, user.chats, pv.support.access.superAdmin);
    promiseUserHaveChat.then(userHaveChat => {
        successfulOutputCallBack(userHaveChat);
    }).catch(error => {
        ErrOutputCallBack(error)
    });
}
module.exports = {
    check: function (data, user, outputCallBack) {

        checkPermissionCanBeUpdateUserName(data, user, outputCallBack, (userChatInfo) => {
            checkChannelUsernameApi.call(data.newUsername, outputCallBack);
        })


    },
    checkPermissionCanBeUpdateUserName:checkPermissionCanBeUpdateUserName
};