"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

// TODO exists query in mongo
function checkChannelUsername(username,key) {
    key=key?key:'username';
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            let where={};
            where[key]={$eq: username};
            userCollection.findOne(where, function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    resolve(username);
                }
                resolve(false);
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