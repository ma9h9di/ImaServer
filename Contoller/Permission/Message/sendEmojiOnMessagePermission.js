//create by Mahdi Khazayi Nezhad at 12/24/2018 1:11 PM
const sendEmojiOnMessageApi = require('../../API/Message/sendEmojiOnMessageApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                //write your code Mahdi Khazayi Nezhad ...
                const sendEmojiOnMessage = await sendEmojiOnMessageApi.call();
                return resolve(sendEmojiOnMessage);
            } catch (e) {
                return reject(e);
            }
        });
    }
};