const logd = require('../Other/Funcion').logd;
const hashMessageID = require('../Other/Funcion').hashMessageID;
const pv = require('../Other/PublicValue');

function getDefaultsChat(user) {
    return {
        superAdmin: user._id,
        membersCount: 1,
        membersID: [{_id: user._id}],
        changeChatTime: new Date().getTime(),//when name or title change when dont use
        lastMessageTime: new Date().getTime(),//when new message ke chat bekhad biad bala
        admin: [{_id: user._id}],
        accessModifier: pv.support.accessModifier.private,
        photoURL: [],
        messageCount: 0,
        Created: {
            creatorDate: new Date().getTime(),
            userCreated: user._id
        }
    }
}

function getChatUser(chat, post, limitShowMessageCount = 0) {
    limitShowMessageCount = limitShowMessageCount ? limitShowMessageCount : 0;
    post = post ? post : pv.support.access.superAdmin;
    let chatUser = {
        post: post,
        chatType: chat.type,
        // accessModifier:chat.accessModifier,
        lastAvalebalMessage: chat.messageCount - limitShowMessageCount,//shomareye akharim mssagi ke mitone bbine
        lastSeenMessage: chat.messageCount - limitShowMessageCount,//shomareye akharim messagi ke dide
        chatID: chat._id,
        joinTime: new Date().getTime(),
        changeChatTime: chat.changeChatTime,
        lastMessageCount: 0//shomare akharin payami ke to in chat hast
    };
    if (chat.hasOwnProperty('hashID')) {
        chatUser['hashID'] = chat.hashID;
    } else {
        chatUser['hashID'] = chat._id;
    }
    return chatUser;
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

class PrivateChat extends Chat {
    constructor(userForChat, userCreator) {
        super(userForChat.firstName, userForChat.bio, userCreator);

        delete this.chatJson.admin;
        delete this.chatJson.superAdmin;
        delete this.chatJson.title;
        delete this.chatJson.description;

        this.chatJson.membersID.push({_id: userForChat._id});
        this.chatJson.type = pv.support.chatType.privateChat;
        this.chatJson.hashID = hashMessageID(userForChat.userID, userCreator.userID)
    }
}

module.exports = {
    Group: Group,
    Channel: Channel,
    Shop: Shop,
    PrivateChat: PrivateChat,
    getChatUser: getChatUser
};
