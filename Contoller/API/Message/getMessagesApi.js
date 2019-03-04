//create by Mahdi Khazayi Nezhad at 18/02/2019 10:40 PM
const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const ObjectID = require('mongodb').ObjectID;
const err = require('../../Model/error');

function call(chatID, messageIDs) {
    return new Promise(async (resolve) => {
        try {
            let answer;
            //write your code Mahdi Khazayi Nezhad
            answer = new err(pv.errCode.not_implemented).jsonErr();
            /*
            * todo Mahdi Khazayi Nezhad 12/23/2018 (db) : #majid inja bayad
            * on chatayi ke counteshon in toye ro bede
            * yani kolan bar asase counte to in chat id countayi ke to in
            * messageIDs hast
            * massageIDs ye arayas [2,3,6,4]
            * answer await db.getMessages(chatID,messageIDs)
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