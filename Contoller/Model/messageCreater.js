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
        lastEditTime:new Date().getTime(),
        serverReceivedTime:new Date().getTime(),
        changeMessageTime:new Date().getTime(),
        seenCount:0,
        isSeen:false,
        messageText:temp.text,
        senderUserID:user.userID,
        receivedChatID:chatID,
        random_id:random_id

    }
}