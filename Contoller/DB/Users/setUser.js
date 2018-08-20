"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function insertUser(user, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");
        mongoUtil.getDb().eval('getNewID("chatID")', function (err, res) {
            user.userID = res;
            userCollection.insertOne(user, function (err, res) {
                if (err) {
                    throw err;
                }
                console.log("response is: ", res.ops[0]);
                callback(res.ops[0]);
            });
        });
    } catch (e) {
        logd(e);
    }
}

function updateUserByPhoneNumber(newUser, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");
        userCollection.updateOne({phone_number: newUser.phone_number}, newUser, function (err, res) {
            if (err) {
                throw err;
            }
            // console.log("new updated document is: ", res.ops[0]);
            callback({});
        });
    } catch (e) {
        logd(e);
    }
}

function updateUserByMongoID(newUser, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");
        userCollection.updateOne({_id: newUser._id}, newUser, function (err, res) {
            if (err) {
                throw err;
            }
            // console.log("new updated document is: ", res.ops[0]);
            callback({});
        });
    } catch (e) {
        logd(e);
    }
}

module.exports =
    {
        insertUser: insertUser,
        updateUserByMongoID: updateUserByMongoID,
        updateUserByPhoneNumber: updateUserByPhoneNumber
    }
;