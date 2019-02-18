const sendMessageApi = require('../../API/Message/sendMessageApi');
const editMessageApi = require('../../API/Message/editMessageApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');
const messageCreater = require('../../Model/messageCreater');


module.exports = {
    check: function (data, user, userHasThisChat) {
        return new Promise(async (resolve, reject) => {
            try {
                //write your code Mahdi Khazayi Nezhad ...
                let userChat;

                if (!data.hasOwnProperty('chatID')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
                } else {
                    try {

                        /*
                        * todo Mahdi Khazayi Nezhad 18/02/2019 (logic) : alan ke hame useran kasio mahdo
                        * nakardim ke natonim behesh message bedim
                        */
                        /*
                        * todo Mahdi Khazayi Nezhad 12/23/2018 (db) : #majid in usere to in chate mitone pm bede
                        * age peyda nakarde reject kon mn to try catch mizaram age peyda kardi on chat id ro bargardon
                        * await db.canSendMessageThisChat(data.chatID,user)
                        */
                        userChat = await userHasThisChat(data.chatID, user.chats);
                    } catch (e) {
                        reject(new err(pv.errCode.message.access_denied_send).jsonErr());
                    }

                }
                if (!data.hasOwnProperty('random_ID')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['random_ID']}).jsonErr());
                }
                /*
                * todo Mahdi Khazayi Nezhad 12/23/2018 (logic) : masalan inja check mikonm radome ham ok bode
                */

                //editMessageID check nemikonm dg age dash ke mikhad edit kone age nadashtam ke hichi dg
                const editMessageID = data.editMessageID;
                let answerCall;

                if (editMessageID === undefined) {
                    const newMessage = await messageCreater(data, user, data.chatID, data.random_ID);
                    answerCall = await sendMessageApi.call(newMessage, user,userChat);
                } else {
                    try {
                        const lastMessage = {};
                        /*
                        * todo Mahdi Khazayi Nezhad 12/23/2018 (db) : #majid
                        *  lastMessage = await db.getMessage({chatID:data.chatID,messageID:editMessageID});
                        */
                        if (lastMessage.senderID === user.userID) {
                            answerCall = await editMessageApi.call(lastMessage, data.message, user);
                        }
                        else {
                            reject(new err(pv.errCode.message.access_denied_message, undefined, {messageID: editMessageID}).jsonErr());
                        }

                    } catch (e) {
                        reject(new err(pv.errCode.message.message_not_found, undefined, {messageID: editMessageID}).jsonErr());
                    }
                }
                resolve(answerCall);
            } catch (e) {
                reject(e);
            }
        });
    }
};