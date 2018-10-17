const getChatsApi = require('../../API/Chat/getChatsApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, outputCallBack) {

        if (!data.hasOwnProperty('chatIDs')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatIDs']}).jsonErr());
            return;
        }
        getChatsApi.call(data.chatIDs, outputCallBack);
    }
};