const getSortedUpdatedChatListApi = require('../../API/Chat/getSortedUpdatedChatListApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data,user) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.hasOwnProperty('last_update_time')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['last_update_time']}).jsonErr());
                }
                const getSortedUpdatedChatList = await getSortedUpdatedChatListApi.call(user,data.last_update_time);
                return resolve(getSortedUpdatedChatList);
            } catch (e) {
                return reject(e);
            }
        });
    }
};