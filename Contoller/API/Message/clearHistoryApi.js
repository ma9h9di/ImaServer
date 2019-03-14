//create by Mahdi Khazayi Nezhad at 12/23/2018 11:33 PM
const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const ObjectID = require('mongodb').ObjectID;
const err = require('../../Model/error');

function call(userChat, user) {
    return new Promise(async (resolve) => {
        try {
            let answer = {successful: true};
            //write your code Mahdi Khazayi Nezhad
            /*
            * do Mahdi Khazayi Nezhad 12/23/2018 (db) : getLast id in chat #majid
            * const lastID=await db.getLastMessageID(chatID);
            */
            /*
            * do Mahdi Khazayi Nezhad 12/23/2018 (db) : setlastAvalebalMessage in user chat for user
            * await db.getLastMessageID(chatID,lastID,user);
            */
            userChat.lastAvalebalMessage = userChat.lastMessageCount;
            await db.updateChatUser(userChat, ['lastAvalebalMessage'], user.userID);

            return resolve({data: answer})
        } catch (e) {
            return resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });
}

module.exports = {
    call: call
};