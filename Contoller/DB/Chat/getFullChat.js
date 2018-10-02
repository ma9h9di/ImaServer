"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;



function getFullChat(chatID, callback) {
    try {
        var userCollection = mongoUtil.getDb().collection("Chats");
        userCollection.findOne({_id: {$eq: chatID}}, function (err, res) {
            if (err) {
                throw err;
            }
            if (!res) {
                res = false;
            }
            callback(res);
        });
    } catch (e) {
        logd(e);
    }
}


module.exports =
    {
        getFullChat: getFullChat
    }
;