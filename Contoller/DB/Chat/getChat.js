"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;


function getChat(chatID) {

    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            userCollection.findOne({_id: {$eq: chatID}}, function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    res = false;
                }
                resolve(res);
            });
        } catch (e) {
            reject(e);
        }
    });
}


module.exports =
    {
        getChatByChatId: getChat
    }
;