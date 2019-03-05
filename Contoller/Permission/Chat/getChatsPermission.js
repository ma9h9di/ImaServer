const getChatsApi = require('../../API/Chat/getChatsApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data,user) {
        return new Promise(async (resolve, reject) => {
            if (!data.hasOwnProperty('chatIDs')) {
                reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatIDs']}).jsonErr());
            }
            try {
                const getChats = await getChatsApi.call(data.chatIDs,user.userID);
                resolve(getChats)
            } catch (e) {
                reject(e);
            }

        });

    }
};