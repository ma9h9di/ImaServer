const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");

function call(data, callback) {
    data._id=data.chatID;
    const promise=db.updateChatByMongoID(pv.support.chatUpdate,data);
    promise.then(value => {
        //Todo:inja bayad run konm test konm bbinm chi mishe
    }).catch(error => {

    })

}

module.exports = {
    call: call
};