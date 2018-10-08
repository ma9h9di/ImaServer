const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const err = require("../../Model/error");
const ObjectID=require("mongodb").ObjectID;

const fullChatInfoApi=require('./getFullChatApi').callByInfoChat;

function call(data, callback) {
    data._id=new ObjectID(data.chatID);
    const promise=db.updateChatByMongoID(pv.support.chatUpdate,data);
    promise.then(value => {
        //Todo:inja bayad run konm test konm bbinm chi mishe
        if (value.matchedCount>0) {
            data.chatID=data._id;
            fullChatInfoApi(data, callback);
        }
        else  callback(new err(pv.errCode.internal_err).jsonErr());
    }).catch(error => {

    })

}

module.exports = {
    call: call
};