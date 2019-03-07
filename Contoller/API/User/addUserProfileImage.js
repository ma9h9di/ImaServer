const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const err = require('../../Model/error');

function call(user, value) {
    return new Promise(async (resolve) => {
        try {
            if (!user.hasOwnProperty('profileImage'))
                user.profileImage = [];
            user.profileImage.push(value.id);
            user.lastProfileChange = new Date().getTime();
            user.lastActivityTime = new Date().getTime();
            const updateUser = await db.updateUserByMongoID(['lastProfileChange', 'lastActivityTime', 'profileImage'], user);
            resolve(updateUser);
        } catch (e) {
            resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });


}


module.exports = {
    call: call
};