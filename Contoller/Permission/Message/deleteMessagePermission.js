//create by Mahdi Khazayi Nezhad at 12/23/2018 11:24 PM
const deleteMessageApi = require('../../API/Message/deleteMessageApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                //write your code Mahdi Khazayi Nezhad ...

                const deleteMessage = await deleteMessageApi.call();
                resolve(deleteMessage);
            } catch (e) {
                reject(e);
            }
        });
    }
};