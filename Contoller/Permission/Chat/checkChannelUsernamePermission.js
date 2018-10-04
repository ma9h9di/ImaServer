const checkChannelUsernameApi = require('../../API/Chat/checkChannelUsername');
const userHasThisChat = require('./getFullChatPermission').userHasThisChat;

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
function checkPermissionCanBeUpdateUserName(data,ErrOutputCallBack,successfulOutputCallBack){
    if (!data.hasOwnProperty('chatID')) {
        ErrOutputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
        return;
    }
    if (!data.hasOwnProperty('newUsername')) {
        ErrOutputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['newUsername']}).jsonErr());
        return;
    }

    let userHaveChat = userHasThisChat(data.chatID, user.chats);
    if (!userHaveChat) {
        ErrOutputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
        return;
    }
    if (pv.support.access.level.indexOf(userHaveChat.post) < pv.support.access.level.indexOf(pv.support.access.superAdmin)) {
        ErrOutputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
        return;
    }
    successfulOutputCallBack();
}
module.exports = {
    check: function (data, outputCallBack) {

        checkPermissionCanBeUpdateUserName(data,outputCallBack,()=>{
            checkChannelUsernameApi.call(value, data.newUsername, outputCallBack);
        })


    },
    checkPermissionCanBeUpdateUserName:checkPermissionCanBeUpdateUserName
};