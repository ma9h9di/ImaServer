const sendMessagePermission = require('./sendMessagePermission');
const forwardMessagesPermission = require('./forwardMessagesPermission');
const deleteMessagePermission = require('./deleteMessagePermission');
const clearHistoryPermission = require('./clearHistoryPermission');
const sendEmojiOnMessagePermission = require('./sendEmojiOnMessagePermission');
const setTypingPermission = require('./setTypingPermission');
const seenMessagesPermission = require('./seenMessagesPermission');
const getSeenMessagesPermission = require('./getSeenMessagesPermission');
const inChatSearchPermission = require('./inChatSearchPermission');
const globalSearchPermission = require('./globalSearchPermission');
const messageSearchPermission = require('./messageSearchPermission');
const payPermission = require('./payPermission');
const sendSupperTicketPermission = require('./sendSupperTicketPermission');
const getMessagesPermission = require('./getMessagesPermission');
const getFullMessagesPermission = require('./getFullMessagesPermission');
const getChangeableMessagePermission = require('./getChangeableMessagePermission');


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

function findMethodPermission(input, user, userHasThisChat) {

    return new Promise(async (resolve, reject) => {
        try {
            let data = input.data;
            let checkAnswer;
            if (!data.hasOwnProperty('chatID')) {
                reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
            }
            switch (input.method) {
                case pv.api.message.sendMessage:
                    data = await messageFormatCheck(data);
                    checkAnswer = await sendMessagePermission.check(data, user, userHasThisChat);
                    break;
                case pv.api.message.forwardMessages:
                    checkAnswer = await forwardMessagesPermission.check();
                    /*
                    * todo Mahdi Khazayi Nezhad 19/02/2019 (logic) : forward hazfe fln
                    */
                    break;
                case pv.api.message.deleteMessage:
                    checkAnswer = await deleteMessagePermission.check();
                    /*
                    * todo Mahdi Khazayi Nezhad 19/02/2019 (logic) : deletam fln hzfe
                    */
                    break;
                case pv.api.message.clearHistory:
                    checkAnswer = await clearHistoryPermission.check(data, user, userHasThisChat);
                    /*
                    * todo Mahdi Khazayi Nezhad 19/02/2019 (logic) : fln to app handel mikonim
                    */
                    break;
                case pv.api.message.sendEmojiOnMessage:
                    checkAnswer = await sendEmojiOnMessagePermission.check();
                    /*
                    * todo Mahdi Khazayi Nezhad 19/02/2019 (logic) : emoji fln hzf
                    */
                    break;
                case pv.api.message.setTyping:
                    checkAnswer = await setTypingPermission.check(data, user, userHasThisChat);
                    /*
                    * todo Mahdi Khazayi Nezhad 19/02/2019 (logic) : esmesh avaz beshe
                    */
                    break;
                case pv.api.message.seenMessages:
                    checkAnswer = await seenMessagesPermission.check(data, user, userHasThisChat);
                    break;
                case pv.api.message.getSeenMessages:
                    checkAnswer = await getSeenMessagesPermission.check(data, user);
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
                    checkAnswer = await getMessagesPermission.check(data, user, userHasThisChat);
                    break;
                case pv.api.message.getFullMessages:
                    checkAnswer = await getFullMessagesPermission.check();
                    break;
                case pv.api.message.getChangableMessage:
                    checkAnswer = await getChangeableMessagePermission.check();
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

    check: function (input, user, userHasThisChat) {
        //todo check koliat az ghabil in ke in methode vojod dare age nadare
        //todo * getDevice from db and check dont use authecion methods more than 20 from  hours
        //todo #DB
        return new Promise(async (resolve, reject) => {
            try {
                user.changeAttribute = [];
                const findMethodP = await findMethodPermission(input, user, userHasThisChat);
                resolve(findMethodP);
            } catch (e) {
                reject(e);
            }
        });


    },
};

