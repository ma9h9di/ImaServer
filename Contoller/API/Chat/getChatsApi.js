const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");

function call(chatIDs, callback) {

    const promise=db.getChats(chatIDs,pv.support.limitedChatKey);
    promise.then(value => {
        //Todo:inja bayad run konm test konm bbinm chi mishe
    }).catch(error => {

    })

}

module.exports = {
    call: call
};