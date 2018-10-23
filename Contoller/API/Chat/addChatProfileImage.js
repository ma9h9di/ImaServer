const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");

const ObjectID = require('mongodb').ObjectID;

function call(chat,value, callback) {
    const promise=db.addChatImageByMongoID(value.id,chat);
    promise.then(callback).catch(error => {
        callback(error);
    })

}


module.exports = {
    call: call
};