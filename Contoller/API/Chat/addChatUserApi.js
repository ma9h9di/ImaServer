const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const getChatUser = require("../../Model/chatCreater").getChatUser;
const err = require('../../Model/error');

const ObjectID = require("mongodb").ObjectID;


function call(userAdded, data) {
    // data._id=data.chatID;
    // data.chatID = new ObjectID(data.chatID);
    return new Promise(async (resolve) => {

        try {
            let value = await db.getChats([data.chatID], {
                'changeChatTime': 1, 'accessModifier': 1, 'type': 1, 'messageCount': 1, '_id': 1
            });

            //todo inja hatamn bayad value[0] bashe ya nemidonm chie
            value = value[0];
            const chatInsert = getChatUser(value, pv.support.access.member, data.limitShowMessageCount);
            const promiseAddChat = db.joinChat(userAdded.userID, chatInsert);
            const promiseAddUse = db.addMemberToChat(data.userID, value.chatID);
            try {
                const values = await Promise.all([promiseAddChat, promiseAddUse]);
                resolve({data: {successful: true}});
            } catch (e) {
                resolve({data: {successful: false}})
            }

        } catch (e) {
            resolve(new err(pv.errCode.internal_err).jsonErr());
        }


    });

}

function callApi(data) {
    // data._id=data.chatID;
    return new Promise((resolve, reject) => {
        const promiseUser = db.getUserByID(new ObjectID(data.userID));
        promiseUser.then(userAdded => {
            // data.chatID = new ObjectID(data.chatID);
            const promiseChatNeed = db.getChats([data.chatID], {
                'changeChatTime': 1, 'accessModifier': 1, 'type': 1, 'messageCount': 1, '_id': 1
            });
            promiseChatNeed.then(value => {
                //todo inja hatamn bayad value[0] bashe ya nemidonm chie
                value = value[0];
                const chatInsert = getChatUser(value, pv.support.access.member, data.limitShowMessageCount);
                const promiseAddChat = db.joinChat(userAdded.userID, chatInsert);
                const promiseAddUse = db.addMemberToChat(data.userID, value.chatID);
                Promise.all([promiseAddChat, promiseAddUse]).then(function (values) {
                    //todo khoroji injast dg harchi mikhay bego bedam
                    resolve(true);
                }).catch(reason => {
                    reject(false);

                });
            }).catch(error => {
                reject(false);

            });
        }).catch(error => {
            reject(false);

        });

    });


}

module.exports = {
    call: call,
    callApi: callApi,
};