//create by Mahdi Khazayi Nezhad at 18/02/2019 08:48 PM
const seenMessagesApi = require('../../API/Message/seenMessagesApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try { 
                 //write your code Mahdi Khazayi Nezhad ...
                         
                const seenMessages = await seenMessagesApi.call();
                resolve(seenMessages);
            } catch (e) {
                reject(e);
            }
        });
    }
};