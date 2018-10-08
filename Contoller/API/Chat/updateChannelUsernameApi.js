const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");

function call(userChatInfo,newUsername, callback) {

    const promise=db.updateChannelUsername(userChatInfo.chatID,newUsername);
    promise.then(value => {
        //Todo:inja bayad run konm test konm bbinm chi mishe
        callback({data:{username:value}})
    }).catch(error => {

    })

}

module.exports = {
    call: call
};