"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

function getMembersChat(chatID) {
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            userCollection.findOne({chatID: {$eq: chatID}}, {'membersID': 1, '_id': 0}, function (err, res) {
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
        getMembersChat: getMembersChat
    }
;