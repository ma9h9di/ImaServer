"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function getChats(chatIDs) {
    return new Promise((resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Chats");
            userCollection.find({_id: {$in: chatIDs}}, function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    res = false;
                }
                resolve(res);
            });
        } catch (e) {
            reject(e);
        }
    });
}


module.exports =
    {
        getChats: getChats
    }
;