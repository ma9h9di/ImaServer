const checkChannelUsernameApi = require('../../API/Chat/checkChannelUsernameApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

function checkPermissionCanBeUpdateUserName(userHasThisChat,data, user, ErrOutputCallBack, successfulOutputCallBack) {
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
        if ((userHaveChat.chatType===pv.support.chatType.channel&&pv.support.usernamePattern.channel.test(data.newUsername))||
            ((userHaveChat.chatType===pv.support.chatType.shop&&pv.support.usernamePattern.shop.test(data.newUsername)))){
            successfulOutputCallBack(userHaveChat);
        }else{
            ErrOutputCallBack(new err(pv.errCode.chat.username_pattern_denied).jsonErr())

        }
    }).catch(error => {
        ErrOutputCallBack(error)
    });
}
module.exports = {
    check: function (data, user, outputCallBack,userHasThisChat) {

        checkPermissionCanBeUpdateUserName(userHasThisChat,data, user, outputCallBack, (userChatInfo) => {
            checkChannelUsernameApi.call(data.newUsername, outputCallBack);
        })


    },
    checkPermissionCanBeUpdateUserName:checkPermissionCanBeUpdateUserName
};