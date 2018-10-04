"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;

// accepts a chat and inserts it to the collection. verification and validation should have been done before
function createChat(chat) {
    return new Promise((resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Chats");
            userCollection.insertOne(chat, function (err, res) {
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
        createChat: createChat
    }
;