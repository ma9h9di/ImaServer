"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;


function updateChannelUsername(chatID,username,key) {
    key=key?key:'username';
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            let q={};
            q[key]=username;
            userCollection.updateOne({_id:{$eq: chatID}}, {$set: q}, function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    resolve(false);
                }
                if (res.matchedCount>0)
                    resolve(username);
                resolve(false);
            });
        } catch (e) {
            reject(e);
        }
    });
}


module.exports =
    {
        updateChannelUsername: updateChannelUsername
    }
;