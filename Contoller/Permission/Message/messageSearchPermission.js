//create by Mahdi Khazayi Nezhad at 18/02/2019 10:32 PM
const messageSearchApi = require('../../API/Message/messageSearchApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                 //write your code Mahdi Khazayi Nezhad ...

                const messageSearch = await messageSearchApi.call();
                resolve(messageSearch);
            } catch (e) {
                reject(e);
            }
        });
    }
};