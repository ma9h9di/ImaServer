const getSortedUpdatedChatListApi = require('../../API/Chat/getSortedUpdatedChatListApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (user,outputCallBack) {

        getSortedUpdatedChatListApi.call(user, outputCallBack);
    }
};