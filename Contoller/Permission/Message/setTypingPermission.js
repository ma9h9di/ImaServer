//create by Mahdi Khazayi Nezhad at 12/28/2018 9:06 PM
const setTypingApi = require('../../API/Message/setTypingApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data, user, userHasThisChat) {
        return new Promise(async (resolve, reject) => {
            let userChat;
            try {
                //write your code Mahdi Khazayi Nezhad ...
                if (!data.hasOwnProperty('chatID')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
                }
                if (!data.hasOwnProperty('status')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['']}).jsonErr());
                }
                userChat = await userHasThisChat(data.chatID, user.chats);

                const seenMessages = await setTypingApi.call(userChat,user,data.status);
                resolve(seenMessages);
            } catch (e) {
                reject(e);
            }
        });
    }
};