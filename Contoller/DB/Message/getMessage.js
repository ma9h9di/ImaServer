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
//                 resolve(res);
//             });
//         } catch (e) {
//             reject(e);
//         }
//     });
// }

function getMessages(chatID, messageIDs, key = undefined) {
    return new Promise((resolve, reject) => {
        try {
            const messageCollection = mongoUtil.getDb().collection("Messages");

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
                    resolve(propArray);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}

module.exports =
    {
        getMessage: getMessages,
    }
;