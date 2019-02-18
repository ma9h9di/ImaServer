//create by Mahdi Khazayi Nezhad at 12/23/2018 11:20 PM
const forwardMessagesApi = require('../../API/Message/forwardMessagesApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                //write your code Mahdi Khazayi Nezhad ...
                /*
                * todo Mahdi Khazayi Nezhad 12/23/2018 (logic) : badan anjamesh midim
                */
                const forwardMessages = await forwardMessagesApi.call();
                resolve(forwardMessages);
            } catch (e) {
                reject(e);
            }
        });
    }
};