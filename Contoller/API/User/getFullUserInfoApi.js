const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const ObjectID=require('mongodb').ObjectID;

function call(userID, callback) {
    // userID = new ObjectID(userID);

    const promise = db.getUserByID(userID,pv.support.userInfoKey);
    promise.then(value => {
        //Todo:inja bayad run konm test konm bbinm chi mishe
        logd('in the getChats', value);
        callback({data: {fullUserInfo: value}})
    }).catch(error => {

    })

}

module.exports = {
    call: call
};