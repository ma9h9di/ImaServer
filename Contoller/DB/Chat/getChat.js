"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;


function getChat(chatID) {

    return new Promise((resolve, reject) => {
        try {
            chatID = parseInt(chatID);
            const userCollection = mongoUtil.getDb().collection("Chats");
            userCollection.findOne({chatID: {$eq: chatID}}, function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    res = false;
                }
                return resolve(res);
            });
        } catch (e) {
            return reject(e);
        }
    });
}


module.exports =
    {
        getChatByChatId: getChat
    }
;