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
            let answer = {data:{successful: true}};
            await pushToAllUser(answer, userChat.chatID,'status_event',{
                chatID: userChat.chatID,
                status: status,
                userID: user.userID
            });

            return resolve(answer)
        } catch (e) {
            return resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });
}

module.exports = {
    call: call
};