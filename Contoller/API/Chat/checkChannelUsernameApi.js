const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");

function call(newUsername, callback) {

    const promise=db.checkChannelUsername(newUsername);
    promise.then(value => {
        //Todo:inja bayad run konm test konm bbinm chi mishe
        callback({data:{username:value}})
    }).catch(error => {

    })

}

module.exports = {
    call: call
};