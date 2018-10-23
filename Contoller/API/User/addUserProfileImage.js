const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");

function call(user,value, callback) {
    if (!user.hasOwnProperty('profileImage'))
        user.profileImage = [];
    user.profileImage.push(value.id);
    user.lastProfileChange = new Date().getTime();
    user.lastActivityTime = new Date().getTime();
    db.updateUserByMongoID(['lastProfileChange', 'lastActivityTime', 'profileImage'], user, callback);

}


module.exports = {
    call: call
};