"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function getAllContacts(phone_number, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");
        userCollection.findOne({phone_number: {$eq: phone_number}}, {_id: 0, contacts: 1}, function (err, res) {
            if (err) {
                throw err;
            }
            if (!res) {
                callback(false);
            } else {
                console.log("helllooooo");
                console.log(res);
                console.log("byeeeeee");
                console.log(res.contacts);
                //callback(res);
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