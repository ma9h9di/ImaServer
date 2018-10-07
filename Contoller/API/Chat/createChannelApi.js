const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const Channel = require("../../Model/chatCreater").Channel;


function call(data,user, outputCallBack) {
    let newGroup=new Channel(data.title,data.description,user).getInit();
    const promiseAddChat = db.createChat(newGroup);
    promiseAddChat.then(chat => {
        const promiseAddUse = db.joinChat(data.userID, require("../../Model/chatCreater").getChatUser(chat));
        promiseAddUse.then(value => {
            //todo in ja baz bayad bbinim khorji chiye dg

        }).catch(error => {

        });
    }).catch(error => {

    });





}

module.exports = {
    call: call
};