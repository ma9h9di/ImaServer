"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

// accepts a chat and inserts it to the collection. verification and validation should have been done before
function createChat(chat) {
    return new Promise(async (resolve, reject) => {
        const uuid = chat.hasOwnProperty('hashID') ? chat.hashID : await mongoUtil.getNextSequenceValue("chatID");

        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            chat.chatID = uuid;
            const insertDoumentSquence = createSequenceDocument(chat.chatID);
            userCollection.insertOne(chat, async function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    res = false;
                }
                await insertDoumentSquence;
                resolve(res.ops[0]);
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