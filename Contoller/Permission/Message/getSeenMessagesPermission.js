//create by Mahdi Khazayi Nezhad at 04/03/2019 10:38 AM
const getSeenMessagesApi = require('../../API/Message/getSeenMessagesApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data,user) {
        return new Promise(async (resolve, reject) => {
            try {
                //write your code Mahdi Khazayi Nezhad ...
                if (!data.hasOwnProperty('chatID')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
                }
                const getSeenMessages = await getSeenMessagesApi.call(data.chatID,user);
                resolve(getSeenMessages);
            } catch (e) {
                reject(e);
            }
        });
    }
};