const updateChannelUsernameApi = require('../../API/Chat/updateChannelUsername');
const checkChannelUsernamePermission = require('./checkChannelUsernamePermission');
const userHasThisChat = require('./getFullChatPermission').userHasThisChat;
const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user, outputCallBack) {
        checkChannelUsernamePermission.check(data, (resultCheck) => {
            if (resultCheck.hasOwnProperty('error')) {
                outputCallBack(resultCheck);
                return;
            }
            if (!userHasThisChat(data.chatID, user.chats)) {
                outputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
                return;
            }
            updateChannelUsernameApi.call(data.chatID, data.newUsername, outputCallBack);

        });
        
    }
};