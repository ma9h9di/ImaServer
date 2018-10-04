const getChatsApi = require('../../API/Chat/getChats');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user, outputCallBack) {

        if (!data.hasOwnProperty('chatIDs')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatIDs']}).jsonErr());
            return;
        }
        getChatsApi.call(user, data.chatIDs, outputCallBack);
    }
};