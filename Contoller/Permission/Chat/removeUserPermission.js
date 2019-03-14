const removeChatUserApi = require('../../API/Chat/removeChatUserApi');
const deleteChatUserApi = require('../../API/Chat/deleteChatUserApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

const ObjectID = require('mongodb').ObjectID;

module.exports = {
    check: function (data, user, userHasThisChat) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.hasOwnProperty('chatID')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
                }
                if (!data.hasOwnProperty('userID')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['userID']}).jsonErr());
                }
                // data.userID = new ObjectID(data.userID);
                const userRemoveded = await db.getUserByID(data.userID);


                try {
                    //2 ta user ozve bashan
                    const promiseUserWorkerHaveChat = await userHasThisChat(data.chatID, user.chats);
                    const promiseUserRemovededHaveChat = await userHasThisChat(data.chatID, userRemoveded.chats);

                    if (pv.support.access.accessLevel.indexOf(promiseUserWorkerHaveChat.post) >= pv.support.access.accessLevel.indexOf(pv.support.access.admin)
                        && pv.support.access.accessLevel.indexOf(promiseUserWorkerHaveChat.post) >= pv.support.access.accessLevel.indexOf(promiseUserRemovededHaveChat.post)) {
                        const removeChatUser = await removeChatUserApi.call(data);
                        return resolve(removeChatUser);
                    } else if (data.userID === user._id) {
                        const result = await deleteChatUserApi.call(promiseUserWorkerHaveChat, user);

                        if (result.data.successful) {
                            const removeChatUser = await removeChatUserApi.call(data);
                            return resolve(removeChatUser);
                        }
                        else
                            return reject(new err(pv.errCode.chat.access_level_denied).jsonErr());

                    } else {
                        return reject(new err(pv.errCode.chat.access_level_denied).jsonErr());

                    }
                } catch (e) {
                    return reject(e);
                }
            } catch (e) {
                return reject(e);
            }
        });


    }
};