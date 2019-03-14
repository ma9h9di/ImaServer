const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const err = require('../../Model/error');


function call(user) {
    return new Promise(async (resolve) => {
        let pinsChat = [];
        for (let i = 0; i < user.chats.length; i++) {
            if (user.chats[i].pin)
                pinsChat.push(user.chats[i].chatID)
        }
        return resolve({data: {chatIDsPin: pinsChat}})
    });

}

module.exports = {
    call: call
};