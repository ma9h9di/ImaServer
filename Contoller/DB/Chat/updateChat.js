"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;


function updateChatByMongoID(changedKeysArray, newChat) {
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            let tempUser = {};
            for (let i = 0; i < changedKeysArray.length; i++) {
                tempUser[changedKeysArray[i]] = newChat[changedKeysArray[i]];
            }
            userCollection.updateOne({_id: newChat._id}, {$set: tempUser}, function (err, res) {
                if (err) {
                    throw err;
                }
                // console.log("new updated document is: ", res.ops[0]);
                resolve({});
            });
        } catch (e) {
            reject(e);
        }
    });
}


module.exports =
    {
        updateChatByMongoID: updateChatByMongoID
    }
;