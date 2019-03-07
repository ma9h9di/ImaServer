"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

function updateSeenMessages(chatID,userID,maxNumberCount) {
    return new Promise(async (resolve, reject) => {
        try {
            const messageCollection = mongoUtil.getDb().collection("Messages");
            messageCollection.updateMany({hashID:chatID,senderUserID: { $ne: userID },messageCount: { $lte: maxNumberCount }}, {$set: {seenCount:1}}, function (err, res) {
                if (err) {
                    throw err;
                }
                resolve({});
            });
        } catch (e) {
            logd(e);
            reject(e)
        }
    });
}

function addMessage(newMessage) {
    return new Promise(async (resolve, reject) => {
        const uuid = await mongoUtil.getNextSequenceValue(newMessage.hashID);

        try {
            const messageCollection = mongoUtil.getDb().collection("Messages");
            newMessage.messageCount = uuid;
            messageCollection.insertOne(newMessage, async function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    res = false;
                }
                resolve(res.ops[0]);
            });
        } catch (e) {
            reject(e);
        }


    });
}

module.exports =
    {
        updateSeenMessages: updateSeenMessages,
        addMessage:addMessage
    }
;