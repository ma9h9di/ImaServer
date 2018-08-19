"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function insertUser(user, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");
        mongoUtil.getDb().eval("getNewID('chatID')", function (err, res) {
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

function updateUserByPhoneNumber(phone_number, newUser, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");
        userCollection.update({phone_number: phone_number}, newUser, function (err, res) {
            if (err) {
                throw err;
            }
            console.log("new updated document is: ", res.ops[0]);
            callback(res.ops[0]);
        });
    } catch (e) {
        logd(e);
    }
}

function updateUserByMongoID(id, newUser, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");
        userCollection.update({_id: id}, newUser, function (err, res) {
            if (err) {
                throw err;
            }
            console.log("new updated document is: ", res.ops[0]);
            callback(res.ops[0]);
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