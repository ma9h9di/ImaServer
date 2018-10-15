const getChatsApi = require("./getChatsApi");

const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");

function call(lastUpdateTime,user, outputCallBack) {
    let chatIDs=[];
    user.chats.forEach(value => {
        if (value.UpdateChatTime>lastUpdateTime)
            chatIDs.push(value);
    });
    getChatsApi.call(chatIDs,outputCallBack);

}

module.exports = {
    call: call
};