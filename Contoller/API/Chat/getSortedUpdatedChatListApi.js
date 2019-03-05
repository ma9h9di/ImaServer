const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const db = require("../../DB/db");
const err = require('../../Model/error');



//in function be darde zamani mikhore ke gp in chiza dashte bashim
//alan behtare hamaro bezarim to khode user
async function getSortedForAllTypeChat(user){
    let chatIDs = [];
    for (let i = 0; i < user.chats.length; i++) {
        chatIDs.push(user.chats[i].hashID);
    }
//todo db.getLastTimesChats Majid
    const getLastTimesChatsPromise = db.getChatsLastTime(chatIDs);
    const promise = db.getChats(chatIDs, pv.support.limitedChatKey);
    const value = await Promise.all([getLastTimesChatsPromise, promise]);
//Todo:inja bayad run konm test konm bbinm chi mishe
    for (let i = 0; i < value[1].length; i++) {
        value[1][i].lastChangeTime = value[0][i];
    }
    return value[1];
}
async function getSortedForUserTypeChat(user){
    let chatIDs = [];
    for (let i = 0; i < user.chats.length; i++) {
        chatIDs.push(user.chats[i].hashID);
    }
//todo db.getLastTimesChats Majid
//     const getLastTimesChatsPromise = db.getChatsLastTime(chatIDs);
    const promise = db.getChats(chatIDs, pv.support.limitedChatKey);
    const value = await Promise.all([ promise]);
//Todo:inja bayad run konm test konm bbinm chi mishe
    for (let i = 0; i < value[1].length; i++) {
        value[1][i].lastChangeTime = user.chats[i].lastMessageCount;
    }
    return value[1];
}



function call(user) {
    return new Promise(async (resolve) => {
        try {
            let sortedChat;
            sortedChat = await getSortedForUserTypeChat(user);
            resolve({data: {chatInfos: sortedChat}})
        } catch (e) {
            resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });


}

module.exports = {
    call: call
};