const setChatInfoApi = require('../../API/Chat/setChatInfoApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/mongoUtil');

module.exports = {
    check: function (data, user, outputCallBack, userHasThisChat) {
        if (!data.hasOwnProperty('chatID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
            return;
        }
        if (!data.hasOwnProperty('title')) {
            // outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['title']}).jsonErr());
            // return;
        } else if ((data.title + '').length < pv.support.minTitleSize) {

            outputCallBack(new err(pv.errCode.chat.title_size_problem).jsonErr());
            return;
        }

        if (!data.hasOwnProperty('description')) {
            // outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['description']}).jsonErr());
            // return;
        } else
            data.description = data.description.substring(0, pv.defaultValue.descriptionLength);

        if (!data.hasOwnProperty('accessModifier')) {
            // outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['accessModifier']}).jsonErr());
            // return;
        } else
            data.accessModifier = data.accessModifier === pv.support.accessModifier.public ? data.accessModifier : pv.support.accessModifier.private;
        let promiseUserHaveChat = userHasThisChat(data.chatID, user.chats, pv.support.access.superAdmin);
        promiseUserHaveChat.then(userHaveChat => {
            setChatInfoApi.call(data, outputCallBack);
        }).catch(error => {
            outputCallBack(error)
        });


    }
};