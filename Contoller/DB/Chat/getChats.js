"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

const ObjectID = require('mongodb').ObjectID;

function getChats(chatIDs,selectedField) {
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Chats");
            userCollection.find({_id: {$in:chatIDs}}).project(selectedField).toArray(function (err, result) {
                if (err) {
                    throw err;
                }
                if (!result) {
                    result = [];
                }
                let propArray=[];
                for (let i = 0; i < result.length; i++) {
                    propArray.push(result[i]);
                }
                // db.close();
                resolve(propArray);
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