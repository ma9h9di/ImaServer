const updateChannelUsernameApi = require('../../API/Chat/updateChannelUsernameApi');
const checkChannelUsernamePermission = require('./checkChannelUsernamePermission').checkPermissionCanBeUpdateUserName;

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user, outputCallBack,userHasThisChat) {
        checkChannelUsernamePermission(userHasThisChat,data,user,outputCallBack, (userChatInfo) => {
            updateChannelUsernameApi.call(userChatInfo,data.newUsername, outputCallBack);

        });
        
    }
};