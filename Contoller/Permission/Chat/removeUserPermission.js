const removeChatUserApi = require('../../API/Chat/removeChatUserApi');
const deleteChatUserApi = require('../../API/Chat/deleteChatUserApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

const ObjectID = require('mongodb').ObjectID;

module.exports = {
    check: function (data, user, outputCallBack, userHasThisChat) {
        if (!data.hasOwnProperty('chatID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
            return;
        }
        if (!data.hasOwnProperty('userID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['userID']}).jsonErr());
            return;
        }
        // data.userID = new ObjectID(data.userID);
        const promiseUser = db.getUserByID(data.userID);
        promiseUser.then(userRemoveded => {
            const promiseUserWorkerHaveChat = userHasThisChat(data.chatID, user.chats);
            const promiseUserRemovededHaveChat = userHasThisChat(data.chatID, userRemoveded.chats);
            //2 ta user ozve bashan
            Promise.all([promiseUserWorkerHaveChat, promiseUserRemovededHaveChat]).then(values => {
                if (pv.support.access.accessLevel.indexOf(values[0].post) >= pv.support.access.accessLevel.indexOf(pv.support.access.admin)
                    && pv.support.access.accessLevel.indexOf(values[0].post) >= pv.support.access.accessLevel.indexOf(values[1].post)) {
                    removeChatUserApi.call(data, outputCallBack);
                } else if (data.userID === user._id) {
                    deleteChatUserApi.call(values[0], user, (result) => {
                        if (result.data.successful)
                            removeChatUserApi.call(data, outputCallBack);
                        else
                            outputCallBack(new err(pv.errCode.chat.access_level_denied).jsonErr());

                    });

                } else {
                    outputCallBack(new err(pv.errCode.chat.access_level_denied).jsonErr());

                }
            }).catch(error => {
                outputCallBack(error)
            });
        }).catch(error => {
            outputCallBack(error)
        })


    }
};