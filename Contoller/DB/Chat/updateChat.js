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
            chatCollection.updateOne({chatID: newChat.chatID}, {$set: tempUser}, function (err, res) {
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
        updateChatByMongoID: updateChatByMongoID
    }
;