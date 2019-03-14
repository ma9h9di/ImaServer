const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const getChatUser = require("../../Model/chatCreater").getChatUser;
const err = require('../../Model/error');

const ObjectID = require("mongodb").ObjectID;


function call(userAdded, data, userChat) {
    // data._id=data.chatID;
    // data.chatID = new ObjectID(data.chatID);
    return new Promise(async (resolve) => {

        try {
            let value = await db.getChats([userChat.chatID], {
                'changeChatTime': 1, 'accessModifier': 1, 'type': 1, 'messageCount': 1, '_id': 1, 'hashID': 1
            });

            //todo inja hatamn bayad value[0] bashe ya nemidonm chie
            value = value[0];
            const chatInsert = getChatUser(value, pv.support.access.member, data.limitShowMessageCount);

            try {
                await db.joinChat(userAdded.userID, chatInsert);
                await db.addMemberToChat(userAdded.userID, value.hashID);
                return resolve({data: {successful: true}});
            } catch (e) {
                return resolve({data: {successful: false}})
            }

        } catch (e) {
            return resolve(new err(pv.errCode.internal_err).jsonErr());
        }


    });

}

function callApi(data, userChat) {
    // data._id=data.chatID;
    return new Promise(async (resolve, reject) => {
        try {
            const userAdded = await db.getUserByID(new ObjectID(data.userID));
            await call(userAdded, data, userChat);
            return resolve(true);
        } catch (e) {
            return reject(false);
        }


    });


}

module.exports = {
    call: call,
    callApi: callApi,
};