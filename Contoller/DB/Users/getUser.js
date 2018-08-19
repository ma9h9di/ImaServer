"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function getUserByPhoneNumber(phone_number, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");
        logd('getUserByPhoneNumber phoneNumber :', phone_number);
        userCollection.findOne({phone_number: {$eq: phone_number}}, function (err, res) {
            // logd('getUserByPhoneNumber res :', res);
            logd('getUserByPhoneNumber err :', err);
            if (err) {
                throw err;
            }
            if (!res) {
                res = false;
                callback(res);
            } else {
                callback(res);
            }
        });
    } catch (e) {
        logd(e);
    }
}


function getUserByToken(token, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");
        logd('getUserByToken token :', token);
        userCollection.findOne({phone_number: {$eq: token}}, function (err, res) {
            logd('getUserByToken res :', res);
            logd('getUserByToken err :', err);
            if (err) {
                throw err;
            }
            if (!res) {
                res = false;
                callback(res);
            } else {
                callback(res);
            }
        });
    } catch (e) {
        logd(e);
    }
}

module.exports =
    {
        getUserByPhoneNumber: getUserByPhoneNumber
    }
;