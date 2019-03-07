"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

function getMessage(messageID) {

    return new Promise((resolve, reject) => {
        try {
            const messageCollection = mongoUtil.getDb().collection("Messages");
            messageCollection.findOne({hashID: {$eq: messageID.chatID},messageCount: {$eq: messageID.messageCount}}, function (err, res) {
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
        getMessage: getMessage,
    }
;