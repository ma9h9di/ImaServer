"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;
const pv = require('../../Other/PublicValue');

// function getMessage(messageID) {
//
//     return new Promise((resolve, reject) => {
//         try {
//             const messageCollection = mongoUtil.getDb().collection("Messages");
//             messageCollection.findOne({
//                 hashID: {$eq: messageID.chatID},
//                 messageCount: {$eq: messageID.messageCount}
//             }, function (err, res) {
//                 if (err) {
//                     throw err;
//                 }
//                 if (!res) {
//                     res = false;
//                 }
//                 return resolve(res);
//             });
//         } catch (e) {
//             return reject(e);
//         }
//     });
// }
function getReplayMessageIDs(chatID, messageIDs) {
    return new Promise((resolve, reject) => {
        try {
            const messageCollection = mongoUtil.getDb().collection("Messages");
            messageCollection.find({
                hashID: chatID,
                messageCount: {$in: messageIDs}
            }).project({"replay_id": 1, "_id": 0}).toArray(function (err, res) {
                if (err) {
                    throw err;
                }
                if (res) {
                    let propArray = [];
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].hasOwnProperty('replay_id')) {
                            propArray.push(res[i].replay_id);
                        }
                    }
                    return resolve(propArray);
                }
            });
        } catch (e) {
            return reject(e);
        }
    });
}

function getMessages(chatID, messageIDs, key = undefined) {
    return new Promise(async (resolve, reject) => {
        try {
            const messageCollection = mongoUtil.getDb().collection("Messages");
            chatID = parseInt(chatID);
            for (let i = 0; i < messageIDs.length; i++) {
                messageIDs[i] = parseInt(messageIDs[i])
            }

            const replayMessageIds = await getReplayMessageIDs(chatID, messageIDs);
            replayMessageIds.forEach(mID => {
                messageIDs.push(mID)
            });
            messageCollection.find({
                hashID: chatID,
                messageCount: {$in: messageIDs}
            }).project(key).toArray(function (err, res) {
                if (err) {
                    throw err;
                }
                if (res) {
                    let propArray = [];
                    for (let i = 0; i < res.length; i++) {
                        propArray.push(res[i]);
                    }
                    return resolve(propArray);
                }
            });
        } catch (e) {
            return reject(e);
        }
    });
}


module.exports =
    {
        getMessage: getMessages,
    }
;