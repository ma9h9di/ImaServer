const updateChannelUsernameApi = require('../../API/Chat/updateChannelUsername');
const checkChannelUsernamePermission = require('./checkChannelUsernamePermission').checkPermissionCanBeUpdateUserName();
const userHasThisChat = require('./getFullChatPermission').userHasThisChat;
const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user, outputCallBack) {
        checkChannelUsernamePermission(data,outputCallBack, () => {
            updateChannelUsernameApi.call(data.chatID, data.newUsername, outputCallBack);

        });
        
    }
};