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
            * answer = await db.getMessages(chatID,messageIDs)
            */
            answer = await db.getMessage(chatID, messageIDs, pv.support.fullMessageKey);
            return resolve({data: {messages: answer}})
        } catch (e) {
            return resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });
}

async function callByNumber(chatID, startMessageData, numberMessage) {
    return new Promise(async (resolve) => {
        let messageIDs = [];
        for (let id = startMessageData; id > startMessageData - numberMessage; id--) {
            messageIDs.push(id);
        }
        const answer =await call(chatID, messageIDs);
        return resolve(answer)
    });


}

module.exports = {
    call: call,
    callByNumber: callByNumber
};