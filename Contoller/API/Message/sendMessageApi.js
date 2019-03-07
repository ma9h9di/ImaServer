//create by Mahdi Khazayi Nezhad at 12/23/2018 11:24 AM
const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pushToUserGenerater = require("../../Other/Funcion").pushToUserGenerater;
const pv = require("../../Other/PublicValue");
const ObjectID = require('mongodb').ObjectID;
const err = require('../../Model/error');
const getNewMessage = require('../../Model/messageCreater').getNewMessage;

function call(data, user, userChat) {
    return new Promise(async (resolve) => {
        const newMessage = await getNewMessage(data.message, user, userChat, data.random_ID);
        try {
            let answer;
            //write your code Mahdi Khazayi Nezhad
            /*
            * todo Mahdi Khazayi Nezhad 18/02/2019 (db) : #majid bayad ye message ro add konim
            * dakhelesh bayad colection chat ro ham ok kone yani shomare akharim messago in chizaro tosh bezare
            *
            * newMessage = await db.addMessage(newMessage)
            */
            userChat.lastMessageCount = newMessage.count;
            /*
            * todo Mahdi Khazayi Nezhad 18/02/2019 (db) : #majid inja bayad ye userChat chato faghat yek
            * elementesho update `lastMessageChangeTime` konim in update many
            * db.updateUserChat(userChat,['lastMessageCount'])
            */
            answer = {data: newMessage};

            let members=[];
            /*
            * todo Mahdi Khazayi Nezhad 07/03/2019 (db) : #majid inja bayad behesh ye chatID midim
            * to array memberasho bargardoni
            * members = await db.getMembersChat(userChat.chatID)
            */
            members.forEach(member => {
                pushToUserGenerater(answer,{data:answer,event:'newMessage'},member,'newMessage')
            });



            resolve(answer)
        } catch (e) {
            resolve(new err(pv.errCode.internal_err).jsonErr());

        }
    });
}

module.exports = {
    call: call
};