const setPinApi = require('../../API/Chat/setPinApi');

const userHasThisChat = require('./chatMainPermissionCheck').userHasThisChat;

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user, outputCallBack) {
        if (!data.hasOwnProperty('chatID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
            return;
        }
        if (!data.hasOwnProperty('pinState')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['pinState']}).jsonErr());
            return;
        }
        let promiseUserHaveChat = userHasThisChat(data.chatID, user.chats);
        promiseUserHaveChat.then(value => {
            setPinApi.call(value, user, outputCallBack);
        }).catch(error => {
            outputCallBack(error)
        });


    }
};