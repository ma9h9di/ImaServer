//create by Mahdi Khazayi Nezhad at 18/02/2019 10:37 PM
const sendSupperTicketApi = require('../../API/Message/sendSupperTicketApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                //write your code Mahdi Khazayi Nezhad ...

                const sendSupperTicket = await sendSupperTicketApi.call();
                return resolve(sendSupperTicket);
            } catch (e) {
                return reject(e);
            }
        });
    }
};