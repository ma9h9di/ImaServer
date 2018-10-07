const getFullChatApi = require('../../API/Chat/getFullChatApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db =require('../../DB/db');
const USER_JOINED_CHAT=5698;



module.exports = {
    check: function ( data, user,outputCallBack) {

        if (!data.hasOwnProperty('chatID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
            return;
        }

        let chatID = data.chatID;
        let chatInUserChat=userHasThisChat(chatID, user.chats);
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

                getFullChatApi.callByFullChat(value, outputCallBack);
            } else {
                getFullChatApi.callByInfoChat(value, outputCallBack);
            }


        });



    }
};