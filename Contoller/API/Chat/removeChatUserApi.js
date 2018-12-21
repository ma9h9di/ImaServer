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
            const promiseAddChat = db.leaveChat(data.userID, data.chatID);
            const promiseAddUse = db.removeMemberFromChat(data.userID, data.chatID);
            const values=await Promise.all([promiseAddChat, promiseAddUse]);
            resolve({data: {successful: true}})
        } catch (e){
            resolve({data: {successful: false}});

        }
    });

    // }).catch(error => {
    //
    // });


}

module.exports = {
    call: call
};