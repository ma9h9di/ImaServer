const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const err = require("../../Model/error");
const ObjectID = require("mongodb").ObjectID;

const fullChatInfoApi = require('./getFullChatApi').callByInfoChat;

function call(data) {
    // data._id = new ObjectID(data.chatID);
    return new Promise(async (resolve) => {
        try {
            const value = await db.updateChatByMongoID(pv.support.chatUpdate, data);
            //Todo:inja bayad run konm test konm bbinm chi mishe
            if (value.matchedCount > 0) {
                const ful = await fullChatInfoApi(data);
                return resolve(ful);
            }
            else return resolve(new err(pv.errCode.internal_err).jsonErr());
        } catch (e) {
            return resolve(new err(pv.errCode.internal_err).jsonErr());

        }


    });


}

module.exports = {
    call: call
};