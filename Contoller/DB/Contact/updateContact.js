"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function updateContact(user, contact, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Users");
        logd("starting query :::::::::::::::::::::::::");
        console.log(user.phone_number);
        console.log(contact.phone_number);
        console.log(contact);

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
                    console.log("error" + err);
                    throw err;
                } else {
                    console.log("res" + res);
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

function deleteContact(user, contact, callback) {
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
        updateContact: updateContact,
        deleteContact: deleteContact,
    }
;