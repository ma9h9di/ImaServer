const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const hashMessageID = require("../../Other/Funcion").hashMessageID;
const pv = require("../../Other/PublicValue");
const err = require('../../Model/error');

function call(chatIDs,userID) {
    return new Promise(async (resolve) => {
        let len=chatIDs.length;
        for (let i = 0; i < len; i++) {
            // chatIDs[i] = new ObjectID(chatIDs[i]);
            chatIDs[len+i] = hashMessageID(userID,chatIDs[i]);
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