//create by Mahdi Khazayi Nezhad at 05/03/2019 07:13 PM
const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const ObjectID = require('mongodb').ObjectID;
const pushToAllUser = require("../../Other/Funcion").pushToAllUser;

const PrivateChat = require("../../Model/chatCreater").PrivateChat;
const getChatUser = require("../../Model/chatCreater").getChatUser;

const err = require('../../Model/error');

const callByInfoChat = require('./getFullChatApi').callByInfoChat;
const callByFullChat = require('./getFullChatApi').callByFullChat;

function call(tagetUser, user, userHasThisChat) {
    return new Promise(async (resolve) => {
        try {
            let answer;
            //write your code Mahdi Khazayi Nezhad
            //answer = new err(pv.errCode.not_implemented).jsonErr();
            try {
                let userChat = await userHasThisChat(tagetUser.userID, user.chats);
                try {
                    answer = await callByInfoChat(userChat);

                    await pushToAllUser(answer, userChat.chatID, 'chat_event');

                    return resolve(answer);
                } catch (e) {
                    return resolve(new err(pv.errCode.internal_err).jsonErr());
                }
            } catch (e) {
                //inja yani inke in usere tahala ba in yaro chat nakarde
                let newPV = new PrivateChat(tagetUser, user).getInit();
                const chat = await db.createChat(newPV);
                let userChat = getChatUser(chat, pv.support.access.member);
                userChat.chatID = tagetUser.userID;
                await db.joinChat(user.userID, userChat);
                userChat.chatID = user.userID;
                await db.joinChat(tagetUser.userID, userChat);
                answer = await callByFullChat(chat);


                await pushToAllUser(answer, chat.chatID, 'chat_event');

                return resolve(answer);
            }
            return resolve({data: answer})
        } catch (e) {
            return resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });
}

module.exports = {
    call: call
};