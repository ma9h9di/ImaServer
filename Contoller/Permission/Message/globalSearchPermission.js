//create by Mahdi Khazayi Nezhad at 18/02/2019 09:54 PM
const globalSearchApi = require('../../API/Message/globalSearchApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                //write your code Mahdi Khazayi Nezhad ...

                const globalSearch = await globalSearchApi.call();
                return resolve(globalSearch);
            } catch (e) {
                return reject(e);
            }
        });
    }
};