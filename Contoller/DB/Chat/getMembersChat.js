"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

//{'membersID._id': 1, '_id': 0}
function getMembersChat(chatID) {
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            chatID = parseInt(chatID);

            userCollection.find({chatID: {$eq: chatID}}).project({
                'membersID._id': 1,
                '_id': 0
            }).toArray(function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    res = false;
                    resolve(res)
                }
                let propArray = [];

                for (let i = 0; i < res.length; i++) {
                    propArray.push(res[i]);
                }
                resolve(propArray[0].membersID);

            });
        } catch (e) {
            reject(e);
        }
    });
}

module.exports =
    {
        getMembersChat: getMembersChat
    }
;