const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const groupCrater = require("../../Model/chatCreater").Group;
const addUser = require("./addChatUserApi");
const err = require('../../Model/error');
const objectID=require('mongodb').ObjectID;

const getFullChat = require('./getFullChatApi');


function call(data, user) {
    return new Promise(async (resolve) => {
        let newGroup = new groupCrater(data.title, data.description, user).getInit();
        try {
            const chat =await db.createChat(newGroup);
            try {
                const value =await db.joinChat(user.userID, require("../../Model/chatCreater").getChatUser(chat));
                //todo in ja baz bayad bbinim khorji chiye dg
                const allPromiseAddUser=[];
                for (let i = 0; i < data.userIDs.length; i++) {
                    allPromiseAddUser.push(addUser.callApi({userID:new objectID(data.userIDs[i]),chatID:chat._id,limitShowMessageCount:0}));
                }
                try {
                    const allPromiseAddUserValue=await Promise.all(allPromiseAddUser);
                    const fullChat=await getFullChat.callByFullChat(chat);
                    resolve(fullChat);

                } catch (e){
                    resolve(new err(pv.errCode.internal_err).jsonErr());

                }
            } catch (e){
                resolve(new err(pv.errCode.internal_err).jsonErr());

            }

        } catch (e){
            resolve(new err(pv.errCode.internal_err).jsonErr());
        }


    });


}

module.exports = {
    call: call
};