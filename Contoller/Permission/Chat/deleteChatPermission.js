const deleteChatUserApi = require('../../API/Chat/deleteChatUserApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data, user, userHasThisChat) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.hasOwnProperty('chatID')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
                }
                let userHaveChat = await userHasThisChat(data.chatID, user.chats, pv.support.access.admin);
                const deleteChatUser = await deleteChatUserApi.call(userHaveChat, user);
                return resolve(deleteChatUser)
            } catch (e) {
                return reject(e);
            }
        });


    }
};