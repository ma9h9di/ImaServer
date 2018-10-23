"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;
const setChatsLastTime = require('./setChatsLastTime').setChatsLastTime;

function addChatImageByMongoID(imageID, newChat) {
    newChat.changeChatTime = new Date().getTime();
    setChatsLastTime(newChat);
    return new Promise((resolve, reject) => {
        try {
            const chatCollection = mongoUtil.getDb().collection("Chats");
            chatCollection.updateOne({_id: newChat._id}, {
                $set: {changeChatTime: newChat.changeChatTime},
                $push: {photoURL: imageID}
            }, function (err, res) {
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
        addChatImageByMongoID: addChatImageByMongoID
    }
;