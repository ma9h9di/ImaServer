"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

function setChatsLastTime(chat) {
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Users");
            userCollection.updateMany({'chats.chatID': chat.chatID}, {$set: {'chats.$.changeChatTime':chat.changeChatTime}}, function (err, res) {
                if (err) {
                    throw err;
                }
                // console.log("new updated document is: ", res.ops[0]);
                resolve(res);
            });
        } catch (e) {
            reject(e);
        }
    });
}



module.exports =
    {
        setChatsLastTime: setChatsLastTime
    }
;