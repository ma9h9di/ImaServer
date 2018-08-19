"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function getUserByPhoneNumber(phone_number, callback) {
    try {
        console.log("before line 10");
        console.log(mongoUtil.getDb().collection);
        var userCollection = mongoUtil.getDb().collection("Users");
        userCollection.findOne({phone_number: {$eq: phone_number}}, function (err, res) {
            if (err) {
                throw err;
            }
            logd(res);
            if (!res) {
                // const date = new Date();
                // var userDefault =
                //     userCollection.insertOne(userDefault, function () {
                //         console.log("inserted default");
                //         callback(userDefault);
                //     });
                console.log(" faaalseeee ")
                res = false;
                callback(res);
            } else {
                callback(res);
            }

        });
    } catch (e) {
        // mongoUtil.connectToServer(function () {
        //     getUserByPhoneNumber(phone_number, callback);
        // });
        console.log("database error line 34 of getUser", e);
    }
}


module.exports =
    {
        getUserByPhoneNumber: getUserByPhoneNumber
    }
;