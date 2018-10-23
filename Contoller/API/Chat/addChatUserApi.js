const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const getChatUser = require("../../Model/chatCreater").getChatUser;

const ObjectID = require("mongodb").ObjectID;


function call(userAdded, data, outputCallBack) {
    // data._id=data.chatID;
    data.chatID = new ObjectID(data.chatID);
    const promiseChatNeed = db.getChats([data.chatID], {
        'changeChatTime':1,'accessModifier': 1, 'type': 1, 'messageCount': 1, '_id': 1
    });
    promiseChatNeed.then(value => {
        //todo inja hatamn bayad value[0] bashe ya nemidonm chie
        value = value[0];
        const chatInsert = getChatUser(value, pv.support.access.member, data.limitShowMessageCount);
        const promiseAddChat = db.joinChat(userAdded._id, chatInsert);
        const promiseAddUse = db.addMemberToChat(data.userID, value._id);
        Promise.all([promiseAddChat, promiseAddUse]).then(function (values) {
            //todo khoroji injast dg harchi mikhay bego bedam
            outputCallBack({data: {successful: true}})
        }).catch(reason => {
            outputCallBack({data: {successful: false}})

        });
    }).catch(error => {

    });


}

module.exports = {
    call: call
};