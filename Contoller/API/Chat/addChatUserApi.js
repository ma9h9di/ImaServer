const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const getChatUser = require("../../Model/chatCreater").getChatUser;




function call(userAdded, data, outputCallBack) {
    // data._id=data.chatID;
    const promiseChatNeed=db.getChats([data.chatID],['messageCount','_id']);
    promiseChatNeed.then(value => {
        //todo inja hatamn bayad value[0] bashe ya nemidonm chie
        const chatInsert=getChatUser(value,data.limitShowMessageCount);
        const promiseAddChat=db.joinChat(userAdded._id,chatInsert);
        const promiseAddUse=db.addMemberToChat(data.userID, value._id);
        Promise.all([promiseAddChat, promiseAddUse]).then(function(values) {
        //todo khoroji injast dg harchi mikhay bego bedam

        }).catch(reason => {

        });
    }).catch(error => {

    });




}

module.exports = {
    call: call
};