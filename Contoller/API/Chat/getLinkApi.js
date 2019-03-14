const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const randomString = require("../../Other/Funcion").randomString;
const pv = require("../../Other/PublicValue");
const err = require('../../Model/error');

const setLinkApi = require('./setLinkApi');


function call(userChat) {
    return new Promise(async (resolve) => {
        const link = randomString(40);
        try {
            const result = await setLinkApi.call(userChat, link);
            if (result.data.link) {
                return resolve(result);
            } else {
                const c = await call(userChat);
                return resolve(c);
            }
        } catch (e) {
            return resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });

}

module.exports = {
    call: call
};