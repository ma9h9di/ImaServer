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
                return resolve(res.ops[0]);
            });
        } catch (e) {
            logd(e);
            return reject(e);
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
                return resolve({});
            });
        } catch (e) {
            logd(e);
            return reject(e);
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
                return resolve({});
            });
        } catch (e) {
            logd(e);
            return reject(e);
        }
    });

}

function updateSessionUserByToken(token, newSocketID) {
    return new Promise(async (resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Users");

            userCollection.updateOne({'session.token': token}, {$set: {'session.$.socketID': newSocketID}}, function (err, res) {
                if (err) {
                    throw err;
                }
                // console.log("new updated document is: ", res.ops[0]);
                return resolve({});
            });
        } catch (e) {
            logd(e);
            return reject(e);
        }
    });

}

function updateContactPhoneNumber(phone_number, userID) {
    return new Promise(async (resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Users");
            let time = new Date().getTime();
            userCollection.updateMany({'contacts.phone_number': phone_number}, {
                $set: {
                    'contacts.$.userID': userID,
                    'contacts.$.addTime': time
                }
            }, function (err, res) {
                if (err) {
                    throw err;
                }
                // console.log("new updated document is: ", res.ops[0]);
                return resolve({});
            });
        } catch (e) {
            logd(e);
            return reject(e);
        }
    });

}

function deleteDataChatUser(userChat, userID) {
    return new Promise(async (resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Users");
            userID = parseInt(userID);
            userChat.hashID = parseInt(userChat.hashID);
            userCollection.updateOne({userID: userID, 'chats.hashID': userChat.hashID},
                {$set: userChat}, function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // console.log("new updated document is: ", res.ops[0]);
                    return resolve({});
                });
        } catch (e) {
            logd(e);
            return reject(e);
        }
    });

}

function updateChatUser(userChat, keys, userID) {
    return new Promise(async (resolve, reject) => {
        try {
            let newChatUser = {};
            for (let i = 0; i < keys.length; i++) {
                newChatUser['chats.$.' + keys[i]] = userChat[keys[i]];
            }
            var userCollection = mongoUtil.getDb().collection("Users");//id user ha va chat ha nemikhaym mese ham bashan
            userID = parseInt(userID);
            userChat.hashID = parseInt(userChat.hashID);
            userCollection.updateMany({'chats.hashID': userChat.hashID},
                {$set: newChatUser}, function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // console.log("new updated document is: ", res.ops[0]);
                    return resolve({});
                });
        } catch (e) {
            logd(e);
            return reject(e);
        }
    });

}

module.exports =
    {
        insertUser: insertUser,
        updateUserByMongoID: updateUserByMongoID,
        updateUserByPhoneNumber: updateUserByPhoneNumber,
        deleteDataChatUser: deleteDataChatUser,
        updateContactPhoneNumber: updateContactPhoneNumber,
        updateChatUser: updateChatUser,
        updateSessionUserByToken: updateSessionUserByToken
    }
;