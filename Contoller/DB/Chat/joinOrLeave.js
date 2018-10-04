"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;

// TODO exists query in mongo
function joinChat(userID, chatJson) {
    return new Promise((resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Users");
            userCollection.updateOne(
                {
                    _id: {$eq: userID}
                },
                {
                    $addToSet: {chats: chatJson}
                },
                function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
        } catch (e) {
            logd(e);
            reject(e);
        }
    });
}

function leaveChat(userID, chatID) {
    return new Promise((resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Users");
            userCollection.updateOne(
                {
                    _id: {$eq: userID}
                },
                {
                    $pull: {
                        chats: {
                            _id: chatID
                        }
                    }
                },

                function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                }
            )
            ;
        } catch (e) {
            logd(e);
            reject(e);
        }
    });
}


module.exports =
    {
        joinChat: joinChat,
        leaveChat: leaveChat

    }
;