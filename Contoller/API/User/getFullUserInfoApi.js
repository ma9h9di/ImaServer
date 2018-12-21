const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const ObjectID = require('mongodb').ObjectID;
const err = require('../../Model/error');

function call(userID, resolve) {
    // userID = new ObjectID(userID);
    return new Promise(async (resolve) => {
        try {
            const value = await db.getUserByID(userID, pv.support.userInfoKey);
        //Todo:inja bayad run konm test konm bbinm chi mishe
            logd('in the getChats', value);
            resolve({data: {fullUserInfo: value}})
        } catch (e) {
            resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });

}

module.exports = {
    call: call
};