const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const err = require('../../Model/error');

function call(chatIDs) {
    return new Promise(async (resolve) => {
        for (let i = 0; i < chatIDs.length; i++) {
            chatIDs[i] = new ObjectID(chatIDs[i]);
        }
        try {
            const value =await db.getChats(chatIDs, pv.support.limitedChatKey);
            //Todo:inja bayad run konm test konm bbinm chi mishe
            //logd('in the getChats', value);
            resolve({data: {chatInfos: value}})
        } catch (e){
            resolve(new err(pv.errCode.internal_err).jsonErr());
        }

    });



}

module.exports = {
    call: call
};