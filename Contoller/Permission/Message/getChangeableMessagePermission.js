//create by Mahdi Khazayi Nezhad at 18/02/2019 10:41 PM
const getChangeableMessageApi = require('../../API/Message/getChangeableMessageApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                //write your code Mahdi Khazayi Nezhad ...

                const getChangeableMessage = await getChangeableMessageApi.call();
                resolve(getChangeableMessage);
            } catch (e) {
                reject(e);
            }
        });
    }
};