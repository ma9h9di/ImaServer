const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");

const ObjectID = require('mongodb').ObjectID;

function call(chatIDs, callback) {
    for (let i = 0; i < chatIDs.length; i++) {
        chatIDs[i] = new ObjectID(chatIDs[i]);
    }
    const promise=db.getChats(chatIDs,pv.support.limitedChatKey);
    promise.then(value => {
        //Todo:inja bayad run konm test konm bbinm chi mishe
        logd('in the getChats', value);
        callback({data:{chatInfos:value}})
    }).catch(error => {

    })

}

module.exports = {
    call: call
};