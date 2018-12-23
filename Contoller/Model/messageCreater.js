const messageType=require('../Other/PublicValue').messageType;
const err=require('../Model/error');
function newMessage(temp,user,chatID,random_id) {
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
        lasteditTime:new Date().getTime(),
        serverRecieveTime:new Date().getTime(),
        changeMessageTime:new Date().getTime(),
        seenCount:0,
        isSeen:false,
        messageText:temp.text,
        senderUserID:user.userID,
        recieverChatID:chatID,
        random_id:random_id

    }
}
function getChatUser(messageTemp,type,user,chatID,random_id) {
    return new Promise(async (resolve,reject) => {
        switch (type) {
            case messageType.text:{
                const newM=newMessage(messageTemp,user,chatID,random_id);
                newM.type=type;
                resolve(newM);
                break;
            }
            default:
                reject(new err(pv.errCode.message.message_type_not_denied, undefined, {messageType: type}).jsonErr());
        }
    });
}
