const updateChannelUsernameApi = require('../../API/Chat/updateChannelUsernameApi');
const checkChannelUsernamePermission = require('./checkChannelUsernamePermission').checkPermissionCanBeUpdateUserName;

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user, userHasThisChat) {
        return new Promise(async (resolve, reject) => {
            try {
                const userChatInfo = await checkChannelUsernamePermission(userHasThisChat, data, user);
                const updateChannelUsername = await updateChannelUsernameApi.call(userChatInfo, data.newUsername);
                resolve(updateChannelUsername);
            } catch (e) {
                reject(e);
            }
        });


    }
};