//create by Mahdi Khazayi Nezhad at 12/23/2018 11:30 PM
const clearHistoryApi = require('../../API/Message/clearHistoryApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data, user) {
        return new Promise(async (resolve, reject) => {
            try {
                //write your code Mahdi Khazayi Nezhad ...
                if (!data.hasOwnProperty('chatID')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
                } else {
                    try {
                        /*
                        * todo Mahdi Khazayi Nezhad 12/23/2018 (db) : #majid in usere to in chate mitone pm bede
                        * age peyda nakarde reject kon mn to try catch mizaram age peyda kardi on chat id ro bargardon
                        * await db.canSendMessageThisChat(data.chatID,user)
                        */

                    } catch (e) {
                        reject(new err(pv.errCode.message.access_denied_send).jsonErr());
                    }
                }

                const clearHistory = await clearHistoryApi.call(data.chatID, user);
                resolve(clearHistory);
            } catch (e) {
                reject(e);
            }
        });
    }
};