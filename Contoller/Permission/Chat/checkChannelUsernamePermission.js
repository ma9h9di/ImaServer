const checkChannelUsernameApi = require('../../API/Chat/checkChannelUsername');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, outputCallBack) {

        if (!data.hasOwnProperty('chatID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
            return;
        }
        if (!data.hasOwnProperty('newUsername')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['newUsername']}).jsonErr());
            return;
        }
        let promise = db.getChatByChatId(data.chatID);
        promise.then((value => {
            if (!value){
                //do error chat_not_found ezafe nashode
                outputCallBack(new err(pv.errCode.chat.chat_not_found).jsonErr());
                return;
            }else{
                checkChannelUsernameApi.call(value,data.newUsername, outputCallBack);
            }
        }));
    }
};