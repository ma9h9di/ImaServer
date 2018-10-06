const addChatUserApi = require('../../API/Chat/addChatUserApi');

const userHasThisChat = require('./chatMainPermissionCheck').userHasThisChat;

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data, user, outputCallBack) {
        if (!data.hasOwnProperty('chatID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
            return;
        }
        if (!data.hasOwnProperty('limitShowMessageCount')) {
            data.limitShowMessageCount=0;
            //TODO inja bayd bayad warning bedim ke begin khodemon defulto 0 kardim
        }

        if (!data.hasOwnProperty('userID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['userID']}).jsonErr());
            return;
        }
        const promiseUser = db.getUserByID(data.userID);
        promiseUser.then(userAdded => {
            //age gharar bashe hame ejaze nade addesh konn harja erroresho inja bayad bezarim

            //age on yaro ke mikhad hzf beshe admin bod in bayad super admin bashe
            let promiseUserHaveChat = userHasThisChat(data.chatID, user.chats, pv.support.access.admin);
            promiseUserHaveChat.then(userHaveChat => {
                addChatUserApi.call(userAdded, data, outputCallBack);
            }).catch(error => {
                outputCallBack(error)
            });
        }).catch(error => {
            outputCallBack(error)
        })




    }
};