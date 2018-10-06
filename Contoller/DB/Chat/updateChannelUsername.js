"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;


function updateChannelUsername(username) {
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            userCollection.updateOne({username: {$eq: username}}, {$set: {username: username}}, function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    resolve(false);
                }
                resolve(username);
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