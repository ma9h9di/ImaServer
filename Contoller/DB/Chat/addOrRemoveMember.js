"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

// TODO exists query in mongo
// TODO increment member count
function addMemberToChat(userID, chatID) {
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            userCollection.updateOne(
                {
                    _id: {$eq: chatID}
                },
                {
                    $addToSet: {membersID: {_id: userID}}
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
            const userCollection = mongoUtil.getDb().collection("Chats");
            userCollection.updateOne(
                {
                    _id: {$eq: chatID}
                },
                {
                    $pull: {
                        membersID: {
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