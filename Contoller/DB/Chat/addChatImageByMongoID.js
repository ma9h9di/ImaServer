"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;
const setChatsLastTime = require('./setChatsLastTime').setChatsLastTime;

function addChatImageByMongoID(imageID, newChat) {

    return new Promise(async (resolve, reject) => {
        try {
            newChat.changeChatTime = new Date().getTime();
            await setChatsLastTime(newChat);
            const chatCollection = mongoUtil.getDb().collection("Chats");
            chatCollection.updateOne({_id: newChat._id}, {
                $set: {changeChatTime: newChat.changeChatTime},
                $push: {photoURL: imageID}
            }, function (err, res) {
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
        addChatImageByMongoID: addChatImageByMongoID
    }
;