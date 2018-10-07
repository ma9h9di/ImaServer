const logd = require('../Other/Funcion').logd;
const pv = require('../Other/PublicValue');

function getDefaultsChat(user) {
    return {
        superAdmin: user._id,
        membersCount: 1,
        membersID: [user._id],

        admin: [user._id],
        accessModifier: pv.support.accessModifier.private,
        messageCount: 0,
        Created: {
            creatorDate: new Date().getTime(),
            userCreated: user._id
        }
    }
}
function getChatUser(chat,limitShowMessageCount){
    limitShowMessageCount=limitShowMessageCount?limitShowMessageCount:0;
    return {
        post:pv.support.access.member,
        chatType:chat.type,
        accessModifier:chat.accessModifier,
        lastAvalebalMessage:chat.messageCount-limitShowMessageCount,
        lastSeenMessage:chat.messageCount-limitShowMessageCount,
        chatID:value._id,
        joinTime:new Date().getTime(),
    };
}

class Chat {
    getInit() {
        return this.chatJson
    }

    constructor(title, description, userCreator) {
        this.chatJson = getDefaultsChat(userCreator);
        this.chatJson.title = title;
        this.chatJson.description = description;

    }


}

class Group extends Chat{

    constructor(title, description, userCreator) {
        super(title, description, userCreator);
        this.chatJson.type = pv.support.chatType.group;
        this.chatJson.groupType = pv.support.groupType.normal;

    }


}
class Channel extends Chat{

    constructor(title, description, userCreator) {
        super(title, description, userCreator);
        this.chatJson.type = pv.support.chatType.channel;

    }


}
class Shop extends Channel{

    constructor(title, description, userCreator) {
        super(title, description, userCreator);
        this.chatJson.type = pv.support.chatType.shop;

    }


}

module.exports = {
    Group:Group,
    Channel:Channel,
    Shop:Shop,
    getChatUser:getChatUser};
