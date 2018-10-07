"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;


function updateChannelUsername(username,key) {
    key=key?key:'username';
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            let where={};
            where[key]={$eq: username};
            userCollection.updateOne(where, {$set: {username: username}}, function (err, res) {
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