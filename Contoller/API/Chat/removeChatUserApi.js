const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const err = require('../../Model/error');


function call(data) {
    // data._id = data.chatID;
    // const promiseChatNeed=db.getChats([data.chatID],['numberOfLastMessages']);
    // promiseChatNeed.then(value => {
    //todo inja hatamn bayad value[0] bashe ya nemidonm chie
    // const chatInsert = {
    //     post: pv.support.access.member,
    //     lastAvalebalMessage: value.numberOfLastMessages - data.limitShowMessageCount,
    //     lastSeenMessage: value.numberOfLastMessages - data.limitShowMessageCount,
    //     chatID: data.chatID,
    //     joinTime: new Date().getTime(),
    // };
    return new Promise(async (resolve) => {
        try {
            await db.leaveChat(data.userID, data.chatID);
            await db.removeMemberFromChat(data.userID, data.chatID);
            resolve({data: {successful: true}})
        } catch (e) {
            resolve({data: {successful: false}});

        }
    });


}

module.exports = {
    call: call
};