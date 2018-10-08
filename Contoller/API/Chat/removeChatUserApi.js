const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");


function call(data, outputCallBack) {
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
    const promiseAddChat = db.leaveChat(data.userID, data.chatID);
    const promiseAddUse = db.removeMemberFromChat(data.userID, data.chatID);
    Promise.all([promiseAddChat, promiseAddUse]).then(function (values) {
        //todo khoroji injast dg harchi mikhay bego bedam

        outputCallBack({data:{successful:true}})
    }).catch(reason => {
        outputCallBack({data:{successful:false}})
    });
    // }).catch(error => {
    //
    // });


}

module.exports = {
    call: call
};