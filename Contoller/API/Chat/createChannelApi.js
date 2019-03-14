const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const Channel = require("../../Model/chatCreater").Channel;
const err = require('../../Model/error');

const getFullChat = require('./getFullChatApi');

function call(data, user) {
    return new Promise(async (resolve) => {
        let newChannel = new Channel(data.title, data.description, user).getInit();
        try {
            const chat = await db.createChat(newChannel);
            const value = await db.joinChat(user.userID, require("../../Model/chatCreater").getChatUser(chat));
            try {
                //todo in ja baz bayad bbinim khorji chiye dg
                const fullChat = await getFullChat.callByFullChat(chat);
                return resolve(fullChat);
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