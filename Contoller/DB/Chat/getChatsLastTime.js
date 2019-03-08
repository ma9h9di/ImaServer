"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

function getChatsLastTime(chats) {
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            for (let i = 0; i < chatIDs; i++) {
                chats[i] = parseInt(chats[i]);
            }
            userCollection.find({chatID: {$in: chats}}).project({lastMessageTime: 1}).toArray(function (err, res) {
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
        getChatsLastTime: getChatsLastTime
    }
;