const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");

function call(userChat,user, callback) {

    //todo nemidonm inja bayad che konm
    userChat.limitShowMessageCount=userChat.lastAvalebalMessage;
    const promise=db.deleteDataChatUser(userChat,user._id);
    promise.then(value => {
        callback({data:{successful:true}});
    }).catch(error => {
        callback({data:{successful:false}});
    })
}

module.exports = {
    call: call
};