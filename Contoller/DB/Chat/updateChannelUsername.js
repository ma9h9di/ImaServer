"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function updateChannelUsername(username, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Chats");
        userCollection.updateOne({username: {$eq: username}}, {$set:{username: username}}, function (err, res) {
            if (err) {
                throw err;
            }
            if (!res) {
                callback(false);
            }
            callback(username);
        });
    } catch (e) {
        logd(e);
    }
}


module.exports =
    {
        updateChannelUsername: updateChannelUsername
    }
;