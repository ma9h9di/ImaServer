//create by Mahdi Khazayi Nezhad at 12/23/2018 11:33 PM
const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const ObjectID = require('mongodb').ObjectID;
const err = require('../../Model/error');

function call(chatID,user) {
    return new Promise(async (resolve) => {
        try {
            let answer={successful:true};
            //write your code Mahdi Khazayi Nezhad
            /*
            * todo Mahdi Khazayi Nezhad 12/23/2018 (db) : getLast id in chat #majid
            * const lastID=await db.getLastMessageID(chatID);
            */
            /*
            * todo Mahdi Khazayi Nezhad 12/23/2018 (db) : setlastAvalebalMessage in user chat for user
            * await db.getLastMessageID(chatID,lastID,user);
            */
            resolve({data: answer})
        } catch (e) {
            resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });
}

module.exports = {
    call: call
};