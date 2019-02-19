//create by Mahdi Khazayi Nezhad at 18/02/2019 10:34 PM
const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const ObjectID = require('mongodb').ObjectID;
const err = require('../../Model/error');

function call(userChat, user, maxSeenMessageCount) {
    return new Promise(async (resolve) => {
        try {
            let answer;
            //write your code Mahdi Khazayi Nezhad
            // answer = new err(pv.errCode.not_implemented).jsonErr();
            userChat.lastSeenMessage = maxSeenMessageCount;
            /*
             * todo Mahdi Khazayi Nezhad 18/02/2019 (db) : #majid inja bayad ye userChat chato faghat yek
             * elementesho update `lastSeenMessage` konim
             * await db.updateUserChat(user,userChat,['lastSeenMessage'])
             * answer={'successful':true}
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