"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function getUserByPhoneNumber(phone_number, callback) {
    try {
        logd(mongoUtil.getDb().collection);
        var userCollection = mongoUtil.getDb().collection("Users");
        logd('getUserByPhoneNumber phoneNumber :',phone_number);
        userCollection.findOne({phone_number: {$eq: phone_number}}, function (err, res) {
            logd('getUserByPhoneNumber res :',res);
            logd('getUserByPhoneNumber err :',err);
            if (err) {
                throw err;
            }

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
        logd(e);
        // mongoUtil.connectToServer(function () {
        //     getUserByPhoneNumber(phone_number, callback);
        // });
    }
}


module.exports =
    {
        getUserByPhoneNumber: getUserByPhoneNumber
    }
;