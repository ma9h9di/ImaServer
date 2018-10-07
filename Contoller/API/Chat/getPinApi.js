const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");



function call(user, outputCallBack) {
    let pinsChat=[];
    for (let i = 0; i < user.chats.length; i++) {
        if (user.chats[i].pin)
            pinsChat.push(user.chats[i])
    }
    outputCallBack({data:{pins:pinsChat}})
}

module.exports = {
    call: call
};