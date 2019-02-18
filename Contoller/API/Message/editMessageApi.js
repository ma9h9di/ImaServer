//create by Mahdi Khazayi Nezhad at 18/02/2019 08:39 PM
const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const ObjectID = require('mongodb').ObjectID;
const err = require('../../Model/error');

function call(lastMessage, newMessage, user) {
    return new Promise(async (resolve) => {
        try {
            let answer;
            //write your code Mahdi Khazayi Nezhad
            
            resolve({data: answer})
        } catch (e) {
            resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });
}

module.exports = {
    call: call
};