const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const ObjectID=require('mongodb').ObjectID;

function call(userIDs, callback) {
    for (let i = 0; i < userIDs.length; i++) {
        userIDs[i] = new ObjectID(userIDs[i]);
    }
    const promise = db.getUsersInfo(userIDs, pv.support.limitedUserKey);
    promise.then(value => {
        //Todo:inja bayad run konm test konm bbinm chi mishe
        logd('in the getChats', value);
        callback({data: {userInfos: value}})
    }).catch(error => {

    })

}

module.exports = {
    call: call
};