const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const Shop = require("../../Model/chatCreater").Shop;
const err = require('../../Model/error');

const getFullChat = require('./getFullChatApi');

function call(data,user, outputCallBack) {
    let newShop=new Shop(data.title,data.description,user).getInit();
    const promiseAddChat = db.createChat(newShop);
    promiseAddChat.then(chat => {
        const promiseAddUse = db.joinChat(user._id, require("../../Model/chatCreater").getChatUser(chat));
        promiseAddUse.then(value => {
            //todo in ja baz bayad bbinim khorji chiye dg
            getFullChat.callByFullChat(chat, outputCallBack);
        }).catch(error => {
            outputCallBack(new err(pv.errCode.internal_err).jsonErr());
        });
    }).catch(error => {
        outputCallBack(new err(pv.errCode.internal_err).jsonErr());
    });





}

module.exports = {
    call: call
};