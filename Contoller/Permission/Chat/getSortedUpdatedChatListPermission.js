const getSortedUpdatedChatListApi = require('../../API/Chat/getSortedUpdatedChatListApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data,user,outputCallBack) {

        if (!data.hasOwnProperty('lastUpdateTime')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['lastUpdateTime']}).jsonErr());
            return;
        }
        getSortedUpdatedChatListApi.call(data.lastUpdateTime,user, outputCallBack);
    }
};