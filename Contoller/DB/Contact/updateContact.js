"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function updateContact(user, contact) {
    return new Promise(async (resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Users");
            logd("starting query :::::::::::::::::::::::::");
            console.log(user.phone_number);
            console.log(contact.phone_number);
            console.log(contact);
            const time = new Date().getTime();

            userCollection.updateOne({
                    "phone_number": user.phone_number,
                    "contacts.phone_number": contact.phone_number
                },
                {
                    $set: {
                        "contacts.$.first_name": contact.first_name,
                        "contacts.$.last_name": contact.last_name,
                        "contacts.$.addTime": time,
                    }
                },
                function (err, res) {

                    if (err) {
                        console.log("error" + err);
                        throw err;
                    } else {
                        console.log("res" + res);
                        var temp = {};
                        temp.contact = contact;
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

function deleteContact(user, contact) {
    return new Promise(async (resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Users");
            logd("starting query :::::::::::::::::::::::::");
            console.log(user.phone_number);
            console.log(contact.phone_number);
            console.log(contact);

            userCollection.updateOne({
                    "phone_number": user.phone_number,
                },
                {
                    $pull: {
                        "user.contacts": {phone_number: contact.phone_number}
                    }
                },
                function (err, res) {

                    if (err) {
                        console.log("error" + err);
                        throw err;
                    } else {
                        console.log("res" + res);
                        var temp = {};
                        temp.contact = contact;
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
        updateContact: updateContact,
        deleteContact: deleteContact,
    }
;