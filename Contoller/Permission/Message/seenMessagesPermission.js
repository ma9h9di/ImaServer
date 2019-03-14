//create by Mahdi Khazayi Nezhad at 18/02/2019 08:48 PM
const seenMessagesApi = require('../../API/Message/seenMessagesApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');
//chatID
// maxSeenMessageCount
module.exports = {
    check: function (data, user, userHasThisChat) {
        return new Promise(async (resolve, reject) => {
            let userChat;
            try {
                //write your code Mahdi Khazayi Nezhad ...
                if (!data.hasOwnProperty('chatID')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
                }
                if (!data.hasOwnProperty('maxSeenMessageCount')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['']}).jsonErr());
                }
                userChat = await userHasThisChat(data.chatID, user.chats);

                const seenMessages = await seenMessagesApi.call(userChat, user, data.maxSeenMessageCount);
                return resolve(seenMessages);
            } catch (e) {
                return reject(e);
            }
        });
    }
};