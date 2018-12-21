const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const ObjectID = require('mongodb').ObjectID;
const err = require('../../Model/error');

function call(userIDs) {
    return new Promise(async (resolve) => {
        try {
            for (let i = 0; i < userIDs.length; i++) {
                userIDs[i] = new ObjectID(userIDs[i]);
            }
            const value = await db.getUsersInfo(userIDs, pv.support.limitedUserKey);
            //Todo:inja bayad run konm test konm bbinm chi mishe
            resolve({data: {userInfos: value}})
        } catch (e) {
            resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });


}

module.exports = {
    call: call
};