const addChatUserApi = require('../../API/Chat/addChatUserApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');
const ObjectID = require('mongodb').ObjectID;

module.exports = {
    check: function (data, user, userHasThisChat) {
        return new Promise(async (resolve, reject) => {
            if (!data.hasOwnProperty('chatID')) {
                reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
            }
            if (!data.hasOwnProperty('limitShowMessageCount')) {
                data.limitShowMessageCount = 0;
                //TODO inja bayd bayad warning bedim ke begin khodemon defulto 0 kardim
            }
            if (!data.hasOwnProperty('userID')) {
                reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['userID']}).jsonErr());
            }
            try {
                const userAdded = await db.getUserByID(new ObjectID(data.userID));
                //age gharar bashe hame ejaze nade addesh konn harja erroresho inja bayad bezarim

                //age on yaro ke mikhad hzf beshe admin bod in bayad super admin bashe

                try {
                    let value = await userHasThisChat(data.chatID, userAdded.chats, pv.support.access.admin);
                    //user exist
                    reject(new err(pv.errCode.chat.user_exist).jsonErr());
                } catch (e) {
                    try {
                        const userHaveChat = await userHasThisChat(data.chatID, user.chats, pv.support.access.admin);
                        const addChatUse = await addChatUserApi.call(userAdded, data, userHaveChat);
                        resolve(addChatUse);
                    } catch (e) {
                        reject(e);

                    }
                }
            } catch (e) {
                reject(e);

            }
        });
    }
};