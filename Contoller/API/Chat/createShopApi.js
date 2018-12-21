const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const Shop = require("../../Model/chatCreater").Shop;
const err = require('../../Model/error');

const getFullChat = require('./getFullChatApi');

function call(data, user) {
    return new Promise(async (resolve) => {
        let newShop = new Shop(data.title, data.description, user).getInit();
        try {
            try {
                const chat =await db.createChat(newShop);
                const value =await db.joinChat(user.userID, require("../../Model/chatCreater").getChatUser(chat));
                const fullChat=await getFullChat.callByFullChat(chat);
                resolve(fullChat);

            } catch (e) {
                resolve(new err(pv.errCode.internal_err).jsonErr());

            }
        } catch (e) {
            resolve(new err(pv.errCode.internal_err).jsonErr());
        }
    });
}

module.exports = {
    call: call
};