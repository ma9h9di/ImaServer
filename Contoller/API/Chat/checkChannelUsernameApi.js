const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const err = require('../../Model/error');

function call(newUsername) {
    return new Promise(async (resolve) => {
        try {
            const value = await db.checkChannelUsername(newUsername);
            return resolve({data: {username: value}})
        } catch (e) {
            return resolve(new err(pv.errCode.internal_err).jsonErr());
        }
    });


}

module.exports = {
    call: call
};