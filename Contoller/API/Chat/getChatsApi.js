const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const getChatUser = require("../../Model/chatCreater").getChatUser;
const pv = require("../../Other/PublicValue");
const err = require('../../Model/error');

function call(chatIDs, user, userHasThisChat) {
    return new Promise(async (resolve) => {
        let len = chatIDs.length;
        let hashIDs = [];
        for (let i = 0; i < len; i++) {
            // chatIDs[i] = new ObjectID(chatIDs[i]);
            hashIDs.push(userHasThisChat(chatIDs[i], user.chats));
        }
        try {
            const value = await db.getChats(hashIDs, pv.support.limitedChatKey);
            //Todo:inja bayad run konm test konm bbinm chi mishe
            //logd('in the getChats', value);
            return resolve({data: {chatInfos: value}})
        } catch (e) {
            return resolve(new err(pv.errCode.internal_err).jsonErr());
        }

    });


}

module.exports = {
    call: call
};