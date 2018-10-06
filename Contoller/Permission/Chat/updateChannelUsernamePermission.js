const updateChannelUsernameApi = require('../../API/Chat/updateChannelUsernameApi');
const checkChannelUsernamePermission = require('./checkChannelUsernamePermission').checkPermissionCanBeUpdateUserName();

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user, outputCallBack) {
        checkChannelUsernamePermission(data,user,outputCallBack, (userChatInfo) => {
            updateChannelUsernameApi.call(data.newUsername, outputCallBack);

        });
        
    }
};