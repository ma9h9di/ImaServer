//create by Mahdi Khazayi Nezhad at 12/28/2018 9:06 PM
const setTypingApi = require('../../API/Message/setTypingApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                 //write your code Mahdi Khazayi Nezhad ...

                const setTyping = await setTypingApi.call();
                resolve(setTyping);
            } catch (e) {
                reject(e);
            }
        });
    }
};