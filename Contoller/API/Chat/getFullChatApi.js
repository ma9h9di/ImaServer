const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");

function callByFullChat(value, callback) {
    const fullChatKey = pv.support.fullChatKey;
    value.accessLevel=value.accessLevel?value.accessLevel:pv.support.access.member;
    let chatInfo = {};
    for (let i = 0; i < fullChatKey.length; i++) {
        let key = fullChatKey[i];
        if (value.hasOwnProperty(key)) {
            chatInfo[key] = value[key];
        }
    }
    callback({'data': chatInfo});

}

function callByInfoChat(value, callback) {
    const promise = db.getChatByChatId(value.chatID);
    promise.then(allChatData => {
        allChatData.accessLevel=value.post;
        callByFullChat(allChatData, callback);
    })
}

/*
 *
 *
 * age callByInfoChat bashe yani in chate to chateyi ke user ozveshe pas public private bodan chataro nemikhad check konim
 * va shekle chatInUserChat ham mishe :
 *   // {
 *   //     "chatID":65556456,
 *   //     "lastMassageIdSeenUser":653,
 *   //     "firstMassageIdCanSeenUser":0
 *   // }
 * pas api bayad az db kole chato dobare begire ,
 * age callByFullChat bashe yani in chate user ozvesh nist on vaght shekle chatInUserChat
 * shekl ye chate kamele pas dg nemikhad api az db chato begire chon premisoin ghablesh gerefte
 *
 *
 */
module.exports = {
    callByFullChat: callByFullChat,
    callByInfoChat: callByInfoChat
};