"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;


function updateChannelUsername(chatID, username, key) {
    key = key ? key : 'username';
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            let q = {};
            q[key] = username;
            chatID = parseInt(chatID);

            userCollection.updateOne({chatID: {$eq: chatID}}, {$set: q}, function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    return resolve(false);
                }
                if (res.matchedCount > 0) {
                    return resolve(username);
                }
                return resolve(false);
            });
        } catch (e) {
            return reject(e);
        }
    });
}


module.exports =
    {
        updateChannelUsername: updateChannelUsername
    }
;