const getChatsApi = require("./getChatsApi");

const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const db = require("../../DB/db");
const err = require('../../Model/error');

function call(user) {
    return new Promise(async (resolve) => {
        try {
            let chatIDs = [];
            for (let i = 0; i < user.chats.length; i++) {
                chatIDs.push(user.chats[i].chatID);
            }
            //todo db.getLastTimesChats Majid
            const getLastTimesChatsPromise = db.getChatsLastTime(chatIDs);
            const promise = db.getChats(chatIDs, pv.support.limitedChatKey);
            const value = await Promise.all([getLastTimesChatsPromise, promise]);
            //Todo:inja bayad run konm test konm bbinm chi mishe
            for (let i = 0; i < value[1].length; i++) {
                value[1][i].lastChangeTime = value[0][i];
            }

            resolve({data: {chatInfos: value[1]}})
        } catch (e) {
            resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });


}

module.exports = {
    call: call
};