//create by Mahdi Khazayi Nezhad at 18/02/2019 10:34 PM
const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pushToAllUser = require("../../Other/Funcion").pushToAllUser;
const workAtTimeObject = require("../../Other/workAtTime");
const pv = require("../../Other/PublicValue");
const ObjectID = require('mongodb').ObjectID;
const err = require('../../Model/error');

function sendSeenSchedule(usersSession, user, seenMessage) {
    return new Promise(async resolve => {
        for (let i = 0; i < usersSession.length; i++) {
            if (usersSession[i].userID !== user.userID) {
                workAtTimeObject.sendSeenMessage(seenMessage,user,usersSession[i].session)
            }
        }
        return resolve({});
    })
}

function call(userChat, user, maxSeenMessageCount) {
    return new Promise(async (resolve) => {
        try {
            let answer;
            answer = {data: {'successful': true}};

            //write your code Mahdi Khazayi Nezhad
            // answer = new err(pv.errCode.not_implemented).jsonErr();
            if (userChat.lastSeenMessage <= maxSeenMessageCount) {
                return resolve(answer);
            }
            userChat.lastSeenMessage = maxSeenMessageCount;
            /*
             * do Mahdi Khazayi Nezhad 18/02/2019 (db) : #majid inja bayad ye userChat chato faghat yek
             * elementesho update `lastSeenMessage` konim
             * ham zaman hameye chataye ghablo bayad seenCountesho yeki bbri bala
             * await db.updateUserChat(user,userChat,['lastSeenMessage'])
             * answer={'successful':true}
             */
            await db.updateSeenMessages(userChat.chatID, user.userID, maxSeenMessageCount);
            let members = await db.getMembersChat(userChat.chatID);
            for (let i = 0; i < members.length; i++) {
                let member = members[i];
                let mid = member._id;
                if (mid !== user.userID) {
                    await db.updateChatUser(userChat, ['lastSeenMessage'], user.userID);

                }

            }
            const seenData={
                chatID: userChat.chatID,
                lastSeenMessageCount: userChat.lastSeenMessage,
                userID: user.userID
            };
            const usersSession = await pushToAllUser(answer, userChat.chatID, 'seen_event', seenData);
            workAtTimeObject.removeWork(seenData.chatID,seenData.lastSeenMessageCount,()=>{
                sendSeenSchedule(usersSession, user, seenData);
            });
            return resolve(answer)
        } catch (e) {

            return resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });
}

module.exports = {
    call: call
};