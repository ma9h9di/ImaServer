"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function getAllContacts(user, timeStart) {
    return new Promise(async (resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Users");
            userCollection.findOne({
                phone_number: {$eq: user.phone_number},
                "contacts.addTime": {$gte: timeStart}
            }, {
                projection: {
                    _id: 0,
                    contacts: 1
                }
            }, function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    res = {contacts: []};
                }
                return resolve(res);

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