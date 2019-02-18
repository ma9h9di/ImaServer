//create by Mahdi Khazayi Nezhad at 18/02/2019 10:40 PM
const getFullMessagesApi = require('../../API/Message/getFullMessagesApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                 //write your code Mahdi Khazayi Nezhad ...

                const getFullMessages = await getFullMessagesApi.call();
                resolve(getFullMessages);
            } catch (e) {
                reject(e);
            }
        });
    }
};