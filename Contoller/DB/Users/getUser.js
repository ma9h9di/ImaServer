"use strict";

var db = require('../db');

function getUserByPhoneNumber(phone_number, callback) {
    try {
        db.db1.collection("Users").findOne({}, function (err, res) {
            if (err) {
                throw err;
            }
            console.log("hellloooo")
            callback(res);
        });
    } catch (e) {
        db.connectToDB(function () {
            getUserByPhoneNumber(phone_number, callback);
    });
    }
}