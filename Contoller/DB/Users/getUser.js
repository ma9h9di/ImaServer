"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;

function getUserByPhoneNumber_promise(phone_number) {
    return new Promise(function (resolve, reject) {
        try {
            let userCollection = mongoUtil.getDb().collection("Users");
            logd('getUserByPhoneNumber_promise phoneNumber :', phone_number);
            userCollection.findOne({phone_number: {$eq: phone_number}}, function (err, res) {
                // logd('getUserByPhoneNumber res :', res);
                logd('getUserByPhoneNumber_promise err :', err);
                if (err) {
                    reject(err);
                }
                if (!res) {
                    res = false;
                }
                resolve(res);
            });
        } catch (e) {
            logd(e);
        }
    });
}

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
            }
            callback(res);
        });
    } catch (e) {
        logd(e);
    }
}

function getUserByToken(token, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");
        logd('getUserByToken token :', token);
        userCollection.findOne({
            session: {
                $elemMatch: {
                    token: token,
                }
            }
        }, function (err, res) {
            if (err) {
                logd('getUserByToken err :', err);
                throw err;
            }
            if (!res) {
                res = false;
            }
            callback(res);
            return res;
        });
    } catch (e) {
        logd(e);
    }
}

module.exports =
    {
        getUserByPhoneNumber: getUserByPhoneNumber,
        getUserByPhoneNumber_promise:getUserByPhoneNumber_promise,
        getUserByToken: getUserByToken

    }
;