"use strict";

var mongoUtil = require('../mongoUtil');


function getUserByPhoneNumber(phone_number, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");
        userCollection.findOne({phone_number: {$eq: phone_number}}, function (err, res) {
            if (err) {
                throw err;
            }
            if (!res) {
                const date = new Date();
                var userDefault =
                    userCollection.insertOne(userDefault, function () {
                        console.log("inserted default");
                        callback(userDefault);
                    });
            }
            console.log(res);
            callback(res);
        });
    } catch (e) {
        mongoUtil.connectToServer(function () {
            getUserByPhoneNumber(phone_number, callback);
        });
    }
}