"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

// accepts a chat and inserts it to the collection. verification and validation should have been done before
function createChat(chat) {
    return new Promise((resolve, reject) => {
        mongoUtil.getNextSequenceValue("chatID",(uuid)=>{
            try {
                const userCollection = mongoUtil.getDb().collection("Chats");
                chat.chatID =uuid;
                    userCollection.insertOne(chat, function (err, res) {
                        if (err) {
                            throw err;
                        }
                        if (!res) {
                            res = false;
                        }
                        resolve(res.ops[0]);
                    });
            } catch (e) {
                reject(e);
            }
        });

    });
}


module.exports =
    {
        createChat: createChat
    }
;