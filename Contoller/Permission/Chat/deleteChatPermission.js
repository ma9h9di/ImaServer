const deleteChatUserApi = require('../../API/Chat/deleteChatUserApi');

const userHasThisChat = require('./chatMainPermissionCheck').userHasThisChat;

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data, user) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.hasOwnProperty('chatID')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
                }
                let userHaveChat = await userHasThisChat(data.chatID, user.chats, pv.support.access.admin);
                const deleteChatUser = await deleteChatUserApi.call(userHaveChat, user);
                resolve(deleteChatUser)
            } catch (e) {
                reject(e);
            }
        });


    }
};