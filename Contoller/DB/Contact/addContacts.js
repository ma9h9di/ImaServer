"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function addContacts(user, contacts, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");


        userCollection.update(
            {
                phone_number: {$eq: user.phone_number}
            },

            {
                $addToSet: {
                    contacts: {
                        $each: contacts
                    }
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
                    temp.contacts = contacts;
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
        addContacts: addContacts
    }
;