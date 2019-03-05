"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function insertUser(user) {
    return new Promise(async (resolve, reject) => {
        const uuid = await mongoUtil.getNextSequenceValue("userID");

        try {
            const userCollection = mongoUtil.getDb().collection("Users");
            user.userID = uuid;
            userCollection.insertOne(user, function (err, res) {
                if (err) {
                    throw err;
                }
                console.log("response is: ", res.ops[0]);
                resolve(res.ops[0]);
            });
        } catch (e) {
            logd(e);
            reject(e);
        }
    });


}

function updateUserByPhoneNumber(newUser) {
    return new Promise(async (resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Users");
            // logd('newUser in update :',newUser);
            userCollection.updateOne({phone_number: newUser.phone_number}, {$set: newUser}, function (err, res) {
                if (err) {
                    throw err;
                }
                // console.log("new updated document is: ", res.ops[0]);
                resolve({});
            });
        } catch (e) {
            logd(e);
            reject(e);
        }
    });

}

function updateUserByMongoID(changedKeysArray, newUser) {
    return new Promise(async (resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Users");
            let tempUser = {};
            for (let i = 0; i < changedKeysArray.length; i++) {
                tempUser[changedKeysArray[i]] = newUser[changedKeysArray[i]];
            }
            userCollection.updateOne({_id: newUser._id}, {$set: tempUser}, function (err, res) {
                if (err) {
                    throw err;
                }
                // console.log("new updated document is: ", res.ops[0]);
                resolve({});
            });
        } catch (e) {
            logd(e);
            reject(e);
        }
    });

}

function deleteDataChatUser(userChat, userID) {
    return new Promise(async (resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Users");
            userCollection.updateOne({userID: userID, 'chats.hashID': userChat.hashID},
                {$set: userChat}, function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // console.log("new updated document is: ", res.ops[0]);
                    resolve({});
                });
        } catch (e) {
            logd(e);
            reject(e);
        }
    });

}

function updateChatUser(userChat,keys, userID) {
    return new Promise(async (resolve, reject) => {
        try {
            let newChatUser={};
            for (let i=0;i<keys.length;i++){
                newChatUser[keys[i]]=userChat[keys[i]];
            }
            var userCollection = mongoUtil.getDb().collection("Users");
            userCollection.updateOne({userID: userID, 'chats.hashID': userChat.hashID},
                {$set: newChatUser}, function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // console.log("new updated document is: ", res.ops[0]);
                    resolve({});
                });
        } catch (e) {
            logd(e);
            reject(e);
        }
    });

}

module.exports =
    {
        insertUser: insertUser,
        updateUserByMongoID: updateUserByMongoID,
        updateUserByPhoneNumber: updateUserByPhoneNumber,
        deleteDataChatUser: deleteDataChatUser,
        updateChatUser:updateChatUser
    }
;