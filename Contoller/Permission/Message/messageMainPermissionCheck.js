const sendMessagePermission =require('./sendMessagePermission');
const forwardMessagesPermission =require('./forwardMessagesPermission');
const deleteMessagePermission =require('./deleteMessagePermission');
const clearHistoryPermission =require('./clearHistoryPermission');
const sendEmojiOnMessagePermission =require('./sendEmojiOnMessagePermission');
const setTypingPermission =require('./setTypingPermission');
const seenMessagesPermission =require('./seenMessagesPermission');
const inChatSearchPermission =require('./inChatSearchPermission');
const globalSearchPermission =require('./globalSearchPermission');
const messageSearchPermission =require('./messageSearchPermission');
const payPermission =require('./payPermission');
const sendSupperTicketPermission =require('./sendSupperTicketPermission');
const getMessagesPermission =require('./getMessagesPermission');
const getFullMessagesPermission =require('./getFullMessagesPermission');
const getChangableMessagePermission =require('./getChangableMessagePermission');


const err = require('../../Model/error');
const logd = require('../../Other/Funcion').logd;
const pv = require('../../Other/PublicValue');
const ObjectID = require('mongodb').ObjectID;

function messageFormatCheck(data) {
    return new Promise((resolve, reject) => {
        if (!data.hasOwnProperty('message')) {
            reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['message']}).jsonErr());
        }

        const message = data.message;
        if (!message.hasOwnProperty('text')) {
            reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['text']}).jsonErr());
        }
        if (!message.hasOwnProperty('type')) {
            reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['type']}).jsonErr());
        }

        resolve(data);
    });

}

function findMethodPermission(input, user,userHasThisChat) {

    return new Promise(async (resolve, reject) => {
        try {
            let data = input.data;
            let checkAnswer;
            switch (input.method) {
                case pv.api.message.sendMessage:
                    data=await messageFormatCheck(data);
                    checkAnswer = await sendMessagePermission.check(data,user,userHasThisChat);
                    break;
                case pv.api.message.forwardMessages:
                    checkAnswer = await forwardMessagesPermission.check();//todo
                    break;
                case pv.api.message.deleteMessage:
                    checkAnswer = await deleteMessagePermission.check();//todo
                    break;
                case pv.api.message.clearHistory:
                    checkAnswer = await clearHistoryPermission.check(data,user);//todo fln to app ok konim
                    break;
                case pv.api.message.sendEmojiOnMessage://todo fln nemikhadm
                    checkAnswer = await sendEmojiOnMessagePermission.check();
                    break;
                case pv.api.message.setTyping://todo smesh avaz she? alan mohem nist
                    checkAnswer = await setTypingPermission.check();
                    break;
                case pv.api.message.seenMessages:
                    checkAnswer = await seenMessagesPermission.check(data,user,userHasThisChat);
                    break;
                case pv.api.message.inChatSearch:
                    checkAnswer = await inChatSearchPermission.check();
                    break;
                case pv.api.message.globalSearch:
                    checkAnswer = await globalSearchPermission.check();
                    break;
                case pv.api.message.messageSearch:
                    checkAnswer = await messageSearchPermission.check();
                    break;
                case pv.api.message.pay:
                    checkAnswer = await payPermission.check();
                    break;
                case pv.api.message.sendSupperTicket:
                    checkAnswer = await sendSupperTicketPermission.check();
                    break;
                case pv.api.message.getMessages:
                    checkAnswer = await getMessagesPermission.check();
                    break;
                case pv.api.message.getFullMessages:
                    checkAnswer = await getFullMessagesPermission.check();
                    break;
                case pv.api.message.getChangableMessage:
                    checkAnswer = await getChangableMessagePermission.check();
                    break;
                default:
                    reject(new err(pv.errCode.method_not_found).jsonErr());
                    break;

            }
            resolve(checkAnswer);
        } catch (e) {
            reject(e);
        }
    });


}

module.exports = {

    check: function (input, user,userHasThisChat) {
        //todo check koliat az ghabil in ke in methode vojod dare age nadare
        //todo * getDevice from db and check dont use authecion methods more than 20 from  hours
        //todo #DB
        return new Promise(async (resolve, reject) => {
            try {
                user.changeAttribute = [];
                const findMethodP = await findMethodPermission(input, user,userHasThisChat);
                resolve(findMethodP);
            } catch (e) {
                reject(e);
            }
        });


    },
};

