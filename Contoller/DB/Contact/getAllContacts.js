"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function getAllContacts(user) {
    return new Promise(async (resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Users");
            userCollection.findOne({phone_number: {$eq: user.phone_number}}, {
                projection: {
                    _id: 0,
                    contacts: 1
                }
            }, function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    return resolve(false);
                } else {
                    return resolve(res);
                }
            });
        } catch (e) {
            logd(e);
            return reject(e);
        }
    });

}

module.exports =
    {
        getAllContacts: getAllContacts
    }
;