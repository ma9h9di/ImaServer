"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function addContacts(user, contact, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");


        userCollection.update({
                phone_number: {$eq: user.phone_number},
                "contacts.phone_number": contact.phone_number
            },
            {
                $set: {
                    "contact.$": contact
                }
            },
            function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    callback(false);
                } else {
                    callback(res.contacts);
                }
            }
        );
    } catch (e) {
        logd(e);
    }
}

module.exports =
    {
        updateContact: updateContact
    }
;