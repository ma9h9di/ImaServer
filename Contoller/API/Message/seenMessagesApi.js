//create by Mahdi Khazayi Nezhad at 18/02/2019 10:34 PM
const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pushToAllUser = require("../../Other/Funcion").pushToAllUser;
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
             * ham zaman hameye chataye ghablo bayad seenCountesho yeki bbri bala
             * await db.updateUserChat(user,userChat,['lastSeenMessage'])
             * answer={'successful':true}
             */

            pushToAllUser({
                chatID: userChat.userSeenChatID,
                lastSeenMessageCount: userChat.lastSeenMessage,
                userID: user.userID
            }, userChat.chatID, 'event', 'seen_even');

            resolve({data: answer})
        } catch (e) {

            resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });
}

module.exports = {
    call: call
};