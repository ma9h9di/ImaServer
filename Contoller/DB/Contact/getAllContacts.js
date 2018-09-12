"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function getAllContacts(user, callback) {

    try {
        var userCollection = mongoUtil.getDb().collection("Users");
        userCollection.findOne({phone_number: {$eq: user.phone_number}}, {_id: 0, contacts: 1}, function (err, res) {
            if (err) {
                throw err;
            }
            if (!res) {
                callback(false);
            } else {
                console.log("9999999999999999999999999999999999999999999");
                console.log(res);


                callback(res);
            }
        });
    } catch (e) {
        logd(e);
    }
}

module.exports =
    {
        getAllContacts: getAllContacts
    }
;