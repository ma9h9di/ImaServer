//create by Mahdi Khazayi Nezhad at 12/23/2018 11:24 AM
const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pushToAllUser = require("../../Other/Funcion").pushToAllUser;
const sendNotifMessage = require("../../Other/workAtTime").sendNotifMessage;
const pv = require("../../Other/PublicValue");
const ObjectID = require('mongodb').ObjectID;
const err = require('../../Model/error');
const getNewMessage = require('../../Model/messageCreater').getNewMessage;


function sendNotifSchedule(usersSession, user, newMessage) {
    return new Promise(async resolve => {
        for (let i = 0; i < usersSession.length; i++) {
            if (usersSession[i].userID !== user.userID) {
                sendNotifMessage(newMessage,user,usersSession[i].session)
            }
        }
        return resolve({});
    })
}


function call(data, user, userChat) {
    return new Promise(async (resolve) => {
        let newMessage = await getNewMessage(data.message, user, userChat, data.random_ID);
        try {
            let answer;
            //write your code Mahdi Khazayi Nezhad
            /*
            * do Mahdi Khazayi Nezhad 18/02/2019 (db) : #majid bayad ye message ro add konim
            * dakhelesh bayad colection chat ro ham ok kone yani shomare akharim messago in chizaro tosh bezare
            * newMessage = await db.addMessage(newMessage)
            */
            newMessage = await db.addMessage(newMessage);
            userChat.lastMessageCount = newMessage.messageCount;
            userChat.lastMessageTime = newMessage.lastEditTime;
            const updateKeys = ['lastMessageCount', 'lastMessageTime'];
            await db.updateChatUser(userChat, updateKeys, user.userID);
            await db.updateChatByMongoID(updateKeys, userChat);
            newMessage.chatID = userChat.userSeenChatID;
            delete newMessage.hashID;
            /*
            * do Mahdi Khazayi Nezhad 18/02/2019 (db) : #majid inja bayad ye userChat chato faghat yek
            * elementesho update `lastMessageChangeTime` konim in update many
            * db.updateUserChat(userChat,['lastMessageCount'])
            */
            answer = {data: newMessage};

            const usersSession = await pushToAllUser(answer, userChat.chatID, 'message_event');
            await sendNotifSchedule(usersSession, user, newMessage);
            return resolve(answer)
        } catch (e) {
            return resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });
}

module.exports = {
    call: call
};