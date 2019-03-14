"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function addContacts(user, contacts) {
    return new Promise(async (resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Users");


            userCollection.updateOne(
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
                        return resolve(false);
                    } else {
                        var temp = {};
                        temp.contacts = contacts;
                        return resolve(temp);
                    }
                }
            );
        } catch (e) {
            logd(e);
            return reject(e);
        }
    });

}

module.exports =
    {
        addContacts: addContacts
    }
;