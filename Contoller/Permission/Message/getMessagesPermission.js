//create by Mahdi Khazayi Nezhad at 18/02/2019 10:40 PM
const getMessagesApi = require('../../API/Message/getMessagesApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const hashMessageID = require('../../Other/Funcion').hashMessageID;
const db = require('../../DB/db');

module.exports = {
    check: function (data, user, userHasThisChat) {
        return new Promise(async (resolve, reject) => {
            try {
                //write your code Mahdi Khazayi Nezhad ...
                let userChat;

                try {
                    /*
                    * todo Mahdi Khazayi Nezhad 18/02/2019 (logic) : alan ke hame useran kasio mahdo
                    * nakardim ke natonim behesh message bedim
                    */
                    /*
                    * do Mahdi Khazayi Nezhad 12/23/2018 (db) : #majid in usere to in chate mitone pm bede
                    * age peyda nakarde reject kon mn to try catch mizaram age peyda kardi on chat id ro bargardon
                    * await db.canSendMessageThisChat(data.chatID,user)
                    */
                    userChat = await userHasThisChat(data.chatID, user.chats);
                } catch (e) {
                    reject(new err(pv.errCode.message.access_denied_send).jsonErr());
                }
                if (!data.hasOwnProperty('messageIDs')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['messageIDs']}).jsonErr());
                }


                const getMessages = await getMessagesApi.call(userChat.chatID, data.messageIDs);
                resolve(getMessages);
            } catch (e) {
                reject(e);
            }
        });
    }
};