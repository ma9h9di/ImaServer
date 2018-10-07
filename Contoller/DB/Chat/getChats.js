"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;


function getChats(chatIDs,selectedField) {
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            userCollection.find({_id: {$in: chatIDs}}, function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    res = false;
                }else{
                    // res=res.ops[0];
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