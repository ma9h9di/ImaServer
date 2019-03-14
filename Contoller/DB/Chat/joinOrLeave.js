"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

// TODO exists query in mongo
function joinChat(userID, chatJson) {
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Users");
            userID = parseInt(userID);

            userCollection.updateOne(
                {
                    userID: {$eq: userID}
                },
                {
                    $addToSet: {chats: chatJson}
                },
                function (err, res) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(res);
                });
        } catch (e) {
            logd(e);
            return reject(e);
        }
    });
}

function leaveChat(userID, chatID) {
    return new Promise((resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Users");
            userCollection.updateOne(
                {
                    userID: {$eq: userID}
                },
                {
                    $pull: {
                        chats: {
                            chatID: chatID
                        }
                    }
                },

                function (err, res) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(res);
                }
            )
            ;
        } catch (e) {
            logd(e);
            return reject(e);
        }
    });
}


module.exports =
    {
        joinChat: joinChat,
        leaveChat: leaveChat

    }
;