const getChatsApi = require("./getChatsApi");

const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const db =require("../../DB/db");

function call(user, outputCallBack) {
    let chatIDs=[];
    for (let i = 0; i < user.chats.length; i++) {
        chatIDs.push(user.chats[i].chatID);
    }
    //todo db.getLastTimesChats Majid
    const getLastTimesChatsPromise=db.getChatsLastTime(chatIDs);
    const promise=db.getChats(chatIDs,pv.support.limitedChatKey);
    Promise.all([getLastTimesChatsPromise,promise]).then(value => {
        //Todo:inja bayad run konm test konm bbinm chi mishe
        for (let i = 0; i < value[1].length; i++) {
            value[1][i].lastChangeTime=value[0][i];
        }

        outputCallBack({data:{chatInfos:value[1]}})
    }).catch(error => {

    });


}

module.exports = {
    call: call
};