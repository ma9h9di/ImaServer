const messageType = require('../Other/PublicValue').messageType;
const err = require('../Model/error');
const hashMessageID=require('../Other/Funcion').hashMessageID;

function newMessage(temp, user, userChat, random_id) {
    return {
        // firstSeenTime
        // attached
        // tag
        // type
        // forwardRefrence
        // hiddenUserID
        // replayRefrence
        // messageID
        // array of messageEmoji
        lastEditTime: new Date().getTime(),
        serverReceivedTime: new Date().getTime(),
        changeMessageTime: new Date().getTime(),
        seenCount: 0,
        isSeen: false,
        messageText: temp.text,
        senderUserID: user.userID,
        receivedChatID: userChat.chatID,
        hashID:userChat.hashID,
        random_id: random_id

    }
}

function getNewMessage(messageTemp, user, userChat, random_id) {
    let type=messageTemp.type;
    return new Promise(async (resolve, reject) => {
        switch (type) {
            case messageType.text: {
                const newM = newMessage(messageTemp, user, userChat, random_id);
                newM.type = type;
                resolve(newM);
                break;
            }
            default:
                reject(new err(pv.errCode.message.message_type_not_denied, undefined, {messageType: type}).jsonErr());
        }
    });
}

module.exports = {
    getNewMessage:getNewMessage
};