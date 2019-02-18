//create by Mahdi Khazayi Nezhad at 18/02/2019 10:40 PM
const getMessagesApi = require('../../API/Message/getMessagesApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try { 
                 //write your code Mahdi Khazayi Nezhad ...
                         
                const getMessages = await getMessagesApi.call();
                resolve(getMessages);
            } catch (e) {
                reject(e);
            }
        });
    }
};