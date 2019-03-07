//create by Mahdi Khazayi Nezhad at 18/02/2019 10:34 PM
const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const ObjectID = require('mongodb').ObjectID;
const err = require('../../Model/error');
const pushToAllUser = require("../../Other/Funcion").pushToAllUser;


function call(userChat, user, status) {
    return new Promise(async (resolve) => {
        try {
            //write your code Mahdi Khazayi Nezhad
            let answer = {successful: true};
            pushToAllUser({
                chatID: userChat.userSeenChatID,
                status: status,
                userID: user.userID
            }, userChat.chatID, 'event', 'status_even');

            resolve({data: answer})
        } catch (e) {
            resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });
}

module.exports = {
    call: call
};