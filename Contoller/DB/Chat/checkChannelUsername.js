"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function checkChannelUsername(username, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Chats");
        userCollection.findOne({username: {$eq: username}}, function (err, res) {
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
        checkChannelUsername: checkChannelUsername
    }
;