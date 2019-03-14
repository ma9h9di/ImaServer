"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;
const setChatsLastTime = require('./setChatsLastTime').setChatsLastTime;

function updateChatByMongoID(changedKeysArray, newChat) {
    newChat.changeChatTime = new Date().getTime();
    changedKeysArray.push('changeChatTime');
    setChatsLastTime(newChat);
    return new Promise((resolve, reject) => {
        try {
            const chatCollection = mongoUtil.getDb().collection("Chats");
            let tempUser = {};
            for (let i = 0; i < changedKeysArray.length; i++) {
                if (newChat.hasOwnProperty(changedKeysArray[i]))
                    tempUser[changedKeysArray[i]] = newChat[changedKeysArray[i]];
            }
            newChat.chatID = parseInt(newChat.chatID);

            chatCollection.updateOne({chatID: newChat.chatID}, {$set: tempUser}, function (err, res) {
                if (err) {
                    throw err;
                }
                // console.log("new updated document is: ", res.ops[0]);
                return resolve(res);
            });
        } catch (e) {
            return reject(e);
        }
    });
}


module.exports =
    {
        updateChatByMongoID: updateChatByMongoID
    }
;