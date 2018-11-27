const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const groupCrater = require("../../Model/chatCreater").Group;
const addUser = require("./addChatUserApi");
const err = require('../../Model/error');
const objectID=require('mongodb').ObjectID;

const getFullChat = require('./getFullChatApi');


function call(data, user, outputCallBack) {
    let newGroup = new groupCrater(data.title, data.description, user).getInit();
    const promiseAddChat = db.createChat(newGroup);
    promiseAddChat.then(chat => {
        const promiseAddUse = db.joinChat(user._id, require("../../Model/chatCreater").getChatUser(chat));
        promiseAddUse.then(value => {
            //todo in ja baz bayad bbinim khorji chiye dg
            const allPromiseAddUser=[];
            for (let i = 0; i < data.userIDs.length; i++) {
                allPromiseAddUser.push(addUser.callApi({userID:new objectID(data.userIDs[i]),chatID:chat._id,limitShowMessageCount:0}));
            }
            Promise.all(allPromiseAddUser).then(allPromiseAddUserValue => {
                getFullChat.callByFullChat(chat, outputCallBack);
            }).catch(reason => {
                outputCallBack(new err(pv.errCode.internal_err).jsonErr());
            });
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