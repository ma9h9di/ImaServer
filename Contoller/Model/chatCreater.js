const logd = require('../Other/Funcion').logd;
const pv = require('../Other/PublicValue');

function getDefaultsChat(user) {
    return {
        superAdmin: user._id,
        membersCount: 1,
        membersID: [{_id:user._id}],
        changeChatTime: new Date().getTime(),//when name or title change when dont use
        lastMessageTime: new Date().getTime(),//when new message ke chat bekhad biad bala
        admin: [{_id:user._id}],
        accessModifier: pv.support.accessModifier.private,
        photoURL:[],
        messageCount: 0,
        Created: {
            creatorDate: new Date().getTime(),
            userCreated: user._id
        }
    }
}

function getChatUser(chat, post, limitShowMessageCount=0) {
    limitShowMessageCount = limitShowMessageCount ? limitShowMessageCount : 0;
    post = post ? post : pv.support.access.superAdmin;
    return {
        post: post,
        chatType: chat.type,
        // accessModifier:chat.accessModifier,
        lastAvalebalMessage: chat.messageCount - limitShowMessageCount,//shomareye akharim mssagi ke mitone bbine
        lastSeenMessage: chat.messageCount - limitShowMessageCount,//shomareye akharim messagi ke dide
        chatID: chat._id,
        joinTime: new Date().getTime(),
        changeChatTime:chat.changeChatTime,
        lastMessageChangeTime: new Date().getTime()//zaman akharim payam
    };
}

class Chat {
    constructor(title, description, userCreator) {
        this.chatJson = getDefaultsChat(userCreator);
        this.chatJson.title = title;
        this.chatJson.description = description;

    }

    getInit() {
        return this.chatJson
    }


}

class Group extends Chat {

    constructor(title, description, userCreator) {
        super(title, description, userCreator);
        this.chatJson.type = pv.support.chatType.group;
        this.chatJson.groupType = pv.support.groupType.normal;

    }


}

class Channel extends Chat {

    constructor(title, description, userCreator) {
        super(title, description, userCreator);
        this.chatJson.type = pv.support.chatType.channel;

    }


}

class Shop extends Channel {

    constructor(title, description, userCreator) {
        super(title, description, userCreator);
        this.chatJson.type = pv.support.chatType.shop;

    }


}

module.exports = {
    Group: Group,
    Channel: Channel,
    Shop: Shop,
    getChatUser: getChatUser
};
