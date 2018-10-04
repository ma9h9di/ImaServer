const getFullChatApi = require('../../API/Chat/getFullChat');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db =require('../../DB/db');
const USER_JOINED_CHAT=5698;

function userHasThisChat(chatID, chats) {
    for (let i = 0; i < chats.length; i++) {
        if (chats[i].chatID===chatID)
            return chats[i];
    }
    return false;
}

module.exports = {
    userHasThisChat:userHasThisChat,
    check: function ( data, user,outputCallBack) {

        if (!data.hasOwnProperty('chatID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
            return;
        }

        let chatID = data.chatID;
        let chatInUserChat=userHasThisChat(chatID, user.chats);
        let inUserChat=true;
        let promise = new Promise( (resolve, reject) =>{
            resolve(USER_JOINED_CHAT);
        });

        if (!chatInUserChat) {
            promise = db.getChatByChatId(chatID);
        }

        promise.then((value)=>{
            if(value!==USER_JOINED_CHAT){
                if (!value){
                    //do error chat_not_found ezafe nashode
                    outputCallBack(new err(pv.errCode.chat.chat_not_found).jsonErr());
                    return;
                }
                if (!value.public){
                    outputCallBack(new err(pv.errCode.chat.access_denied_chat).jsonErr());
                    return;
                }
                inUserChat=false;
                chatInUserChat=value;
            }
            /*
            *
            *
            * inUserChat ham mitoni true bashe ham mitone false bashe
            * age true bashe yani in chate to chateyi ke user ozveshe pas public private bodan chataro nemikhad check konim
            * va shekle chatInUserChat ham mishe :
            *   // {
            *   //     "chatID":65556456,
            *   //     "lastMassageIdSeenUser":653,
            *   //     "firstMassageIdCanSeenUser":0
            *   // }
            * pas api bayad az db kole chato dobare begire ,
            * age false bashe yani in chate user ozvesh nist on vaght shekle chatInUserChat
            * shekl ye chate kamele pas dg nemikhad api az db chato begire chon premisoin ghablesh gerefte
            *
            *
            */
            getFullChatApi.call(chatInUserChat, inUserChat, outputCallBack);
        });



    }
};