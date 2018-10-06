"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

// TODO exists query in mongo
function checkChannelUsername(username) {
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            userCollection.findOne({username: {$eq: username}}, function (err, res) {
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
        checkChannelUsername: checkChannelUsername
    }
;