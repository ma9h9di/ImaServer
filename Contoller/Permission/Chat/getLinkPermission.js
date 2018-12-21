const getLinkApi = require('../../API/Chat/getLinkApi');

const userHasThisChat = require('./chatMainPermissionCheck').userHasThisChat;


const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.hasOwnProperty('chatID')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
                }
                if (!data.hasOwnProperty('link')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['link']}).jsonErr());
                }
                if ((data.link + '').length < pv.support.minLinkSize) {
                    reject(new err(pv.errCode.chat.link_size_problem).jsonErr());
                }

                let value = await userHasThisChat(data.chatID, user.chats, pv.support.access.superAdmin);
                const getLink = await getLinkApi.call(data, user);
                resolve(getLink);
            } catch (e) {
                reject(e);
            }
        });


    }
};