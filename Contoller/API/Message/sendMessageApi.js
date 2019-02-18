//create by Mahdi Khazayi Nezhad at 12/23/2018 11:24 AM
const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const ObjectID = require('mongodb').ObjectID;
const err = require('../../Model/error');

function call(newMessage, user, userChat) {
    return new Promise(async (resolve) => {
        try {
            let answer;
            //write your code Mahdi Khazayi Nezhad
            userChat.lastMessageChangeTime = newMessage.lastEditTime;
            /*
            * todo Mahdi Khazayi Nezhad 18/02/2019 (db) : #majid inja bayad ye userChat chato faghat yek elementesho update
            * konim
            * db.updateUserChat(user,userChat)
            */
            /*
            * todo Mahdi Khazayi Nezhad 18/02/2019 (db) : #majid bayad ye message ro add konim
            * dakhelesh bayad colection chat ro ham ok kone yani shomare akharim messago in chizaro tosh bezare
            *
            * await db.addMessage(newMessage)
            */
            answer = newMessage;
            resolve({data: answer})
        } catch (e) {
            resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });
}

module.exports = {
    call: call
};