const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const err = require('../../Model/error');


function call(userChat, link) {
    return new Promise(async (resolve) => {
        try {
            const value = await db.checkChannelUsername(link, 'link');
            if (value) {
                //linke vojod dashte bayad err bedim
                return resolve({data: {link: false}})
            } else {
                const value1 = await db.updateChannelUsername(userChat.chatID, value, 'link');
                return resolve({data: {link: value}});
            }
        } catch (e) {
            return resolve(new err(pv.errCode.internal_err).jsonErr());

        }


    });


}

module.exports = {
    call: call
};