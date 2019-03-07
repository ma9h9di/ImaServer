//create by Mahdi Khazayi Nezhad at 18/02/2019 10:36 PM
const payApi = require('../../API/Message/payApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                //write your code Mahdi Khazayi Nezhad ...

                const pay = await payApi.call();
                resolve(pay);
            } catch (e) {
                reject(e);
            }
        });
    }
};