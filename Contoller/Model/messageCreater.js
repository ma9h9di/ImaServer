const messageType = require('../Other/PublicValue').messageType;
const pv = require('../Other/PublicValue');
const err = require('../Model/error');
const hashMessageID = require('../Other/Funcion').hashMessageID;

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
        lastEditTime: new Date().getTime(),//nemikhay
        serverReceivedTime: new Date().getTime(),
        changeMessageTime: new Date().getTime(),//nemikhay
        seenCount: 0,
        messageText: temp.text,
        extra_data: temp.extra_data,
        senderUserID: user.userID,
        hashID: userChat.hashID,//nemikhay
        random_id: random_id,
        //messageCounter

    }
}

function getNewMessageNotif(newMessage,user) {
    return {
        body:  newMessage.messageText.substring(0, pv.defaultValue.messageLengthNothif),
        title:user.firstName
    }
}
function getNewMessage(messageTemp, user, userChat, random_id) {
    let type = messageTemp.type;
    return new Promise(async (resolve, reject) => {
        switch (type) {
            case messageType.money:
            case messageType.text: {
                const newM = newMessage(messageTemp, user, userChat, random_id);
                newM.type = type;
                return resolve(newM);
                break;
            }
            default:
                return reject(new err(pv.errCode.message.message_type_not_denied, undefined, {messageType: type}).jsonErr());
        }
    });
}

module.exports = {
    getNewMessage: getNewMessage,
    getNewMessageNotif: getNewMessageNotif
};