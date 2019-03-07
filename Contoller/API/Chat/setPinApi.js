const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const err = require('../../Model/error');


function call(userChat, user) {
    //todo db setPin majid
    return new Promise(async (resolve) => {
        userChat.pin = true;
        try {
            await db.updateChatUser(userChat, ['pin'], user.userID);
            resolve({data: {successful: true}});
        } catch (e) {
            resolve({data: {successful: false}});
        }
    });
}

module.exports = {
    call: call
};