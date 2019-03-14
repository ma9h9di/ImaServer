const checkChannelUsernameApi = require('../../API/Chat/checkChannelUsernameApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

function checkPermissionCanBeUpdateUserName(userHasThisChat, data, user) {
    return new Promise(async (resolve, reject) => {
        if (!data.hasOwnProperty('chatID')) {
            return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
        }
        if (!data.hasOwnProperty('newUsername')) {
            return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['newUsername']}).jsonErr());
        }
        try {
            let userHaveChat = await userHasThisChat(data.chatID, user.chats, pv.support.access.superAdmin);

            if ((userHaveChat.chatType === pv.support.chatType.channel && pv.support.usernamePattern.channel.test(data.newUsername)) ||
                ((userHaveChat.chatType === pv.support.chatType.shop && pv.support.usernamePattern.shop.test(data.newUsername)))) {
                return resolve(userHaveChat);
            } else {
                return reject(new err(pv.errCode.chat.username_pattern_denied).jsonErr())
            }

        } catch (e) {
            return reject(e);

        }

    });

}

module.exports = {
    check: function (data, user, userHasThisChat) {
        return new Promise(async (resolve, reject) => {
            try {
                await checkPermissionCanBeUpdateUserName(userHasThisChat, data, user);
                const checkChannelUsername = await checkChannelUsernameApi.call(data.newUsername);
                return resolve(checkChannelUsername);
            } catch (e) {
                return resolve(false);
            }
        });
    },
    checkPermissionCanBeUpdateUserName: checkPermissionCanBeUpdateUserName
};