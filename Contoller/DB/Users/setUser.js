"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function insertUser(user, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");
        user.userID = 'getNewID("chatID")';
        userCollection.insertOne(user, function (err, res) {
            if (err) {
                throw err;
            }
            console.log("response is: ", res.ops[0]);
            callback(res.ops[0]);
        });
    } catch (e) {
        logd(e);
    }
}


module.exports =
    {
        insertUser: insertUser
    }
;