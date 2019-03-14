const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const groupCrater = require("../../Model/chatCreater").Group;
const addUser = require("./addChatUserApi");
const err = require('../../Model/error');
const objectID = require('mongodb').ObjectID;

const getFullChat = require('./getFullChatApi');


function call(data, user) {
    return new Promise(async (resolve) => {
        let newGroup = new groupCrater(data.title, data.description, user).getInit();
        try {
            const chat = await db.createChat(newGroup);
            try {
                const userChat = require("../../Model/chatCreater").getChatUser(chat);
                await db.joinChat(user.userID, userChat);
                //todo in ja baz bayad bbinim khorji chiye dg
                const allPromiseAddUser = [];
                for (let i = 0; i < data.userIDs.length; i++) {
                    allPromiseAddUser.push(addUser.callApi({
                        userID: new objectID(data.userIDs[i]),
                        limitShowMessageCount: 0
                    }), userChat);
                }
                try {
                    await Promise.all(allPromiseAddUser);
                    const fullChat = await getFullChat.callByFullChat(chat);
                    return resolve(fullChat);

                } catch (e) {
                    return resolve(new err(pv.errCode.internal_err).jsonErr());

                }
            } catch (e) {
                return resolve(new err(pv.errCode.internal_err).jsonErr());

            }

        } catch (e) {
            return resolve(new err(pv.errCode.internal_err).jsonErr());
        }


    });


}

module.exports = {
    call: call
};