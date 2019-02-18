//create by Mahdi Khazayi Nezhad at 18/02/2019 09:53 PM
const inChatSearchApi = require('../../API/Message/inChatSearchApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try { 
                 //write your code Mahdi Khazayi Nezhad ...
                         
                const inChatSearch = await inChatSearchApi.call();
                resolve(inChatSearch);
            } catch (e) {
                reject(e);
            }
        });
    }
};