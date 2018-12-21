const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const err = require('../../Model/error');

const ObjectID = require('mongodb').ObjectID;

function call(chat, value) {
    return new Promise(async (resolve) => {
        try {
            const promise =await db.addChatImageByMongoID(value.id, chat);
            resolve(promise);
        } catch (e){
            resolve(new err(pv.errCode.internal_err).jsonErr());
        }
    });

}


module.exports = {
    call: call
};