"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function updateContact(user, contact, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");

        userCollection.updateOne({
                "phone_number": user.phone_number,
                "contacts.phone_number": contact.phone_number
            },
            {
                $set: {
                    "contacts.$": contact
                }
            },
            function (err, res) {

                if (err) {
                    throw err;
                }
                if (!res) {
                    callback(false);
                } else {
                    var temp = {};
                    temp.contact = contact;
                    callback(temp);
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