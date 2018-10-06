"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

// TODO exists query in mongo
function addMemberToChat(userID, chatID) {
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            userCollection.updateOne(
                {
                    _id: {$eq: chatID}
                },
                {
                    $addToSet: {members: {_id: userID}}
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

function removeMemberFromChat(userID, chatID) {
    return new Promise((resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Chats");
            userCollection.updateOne(
                {
                    _id: {$eq: chatID}
                },
                {
                    $pull: {
                        members: {
                            _id: userID
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
        addMemberToChat: addMemberToChat,
        removeMemberFromChat: removeMemberFromChat
    }
;