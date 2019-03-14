const getSortedUpdatedChatListApi = require('../../API/Chat/getSortedUpdatedChatListApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (user) {
        return new Promise(async (resolve, reject) => {
            try {
                const getSortedUpdatedChatList = await getSortedUpdatedChatListApi.call(user);
                return resolve(getSortedUpdatedChatList);
            } catch (e) {
                return reject(e);
            }
        });
    }
};