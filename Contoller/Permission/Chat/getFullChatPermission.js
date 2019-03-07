const getFullChatApi = require('../../API/Chat/getFullChatApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');
const USER_JOINED_CHAT = 5698;


module.exports = {
    check: function (data, user, userHasThisChat) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.hasOwnProperty('chatID')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
                }

                let chatID = data.chatID;

                const chatInUserChat = await userHasThisChat(chatID, user.chats);

                const getFullChat = await getFullChatApi.callByInfoChat(chatInUserChat);
                resolve(getFullChat);


            } catch (e) {
                try {
                    const value = await db.getChatByChatId(chatID);
                    if (!value) {
                        //do error chat_not_found ezafe nashode
                        reject(new err(pv.errCode.chat.chat_not_found).jsonErr());
                    }
                    if (value.accessModifier !== pv.support.accessModifier.public) {
                        reject(new err(pv.errCode.chat.access_denied_chat).jsonErr());
                    }
                    value.accessLevel = pv.support.access.member;
                    const getFullCha = await getFullChatApi.callByFullChat(value);
                    resolve(getFullCha);
                } catch (e) {
                    reject(e);
                }


            }
        });

    }
};