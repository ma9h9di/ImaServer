const allApi = {
    authentication: {
        checkPhone: 'checkPhone',
        sendCode: 'sendCode',
        sendSms: 'sendSms',
        signUp: 'singUp',
        signIn: 'singIn',
        logOut: 'logOut',
        removeSession: 'removeSession'
    },
    contacts: {
        getAllContacts: 'getAllContacts',
        updateContact: 'updateContact',
        addContacts: 'addContacts',
    },
    chat: {
        getFullChat: 'getFullChat',
        getChats: 'getChats',
        getSortedUpdatedChatList: 'getSortedUpdatedChatList',
        checkChannelUsername: 'checkChannelUsername',
        updateChannelUsername: 'updateChannelUsername',
        setChatInfo: 'setChatInfo',
        addChatUser: 'addChatUser',
        removeUser: 'removeUser',
        deleteChat: 'deleteChat',
        createGroup: 'createGroup',
        createPrivateChat: 'createPrivateChat',
        createChannel: 'createChannel',
        createShop: 'createShop',
        setLink: 'setLink',
        getLink: 'getLink',
        getPin: 'getPin',
        setPin: 'setPin',
    },
    user: {
        getUsersInfo: 'getUsersInfo',
        getFullUserInfo: 'getFullUserInfo',
    },
    message: {
        sendMessage: 'sendMessage',
        forwardMessages: 'forwardMessages',
        deleteMessage: 'deleteMessage',
        clearHistory: 'clearHistory',
        sendEmojiOnMessage: 'sendEmojiOnMessage',
        setTyping: 'setTyping',
        seenMessages: 'seenMessages',
        getSeenMessages: 'getSeenMessages',
        inChatSearch: 'inChatSearch',
        globalSearch: 'globalSearch',
        messageSearch: 'messageSearch',
        pay: 'pay',
        sendSupperTicket: 'sendSupperTicket',
        getMessages: 'getMessages',
        getFullMessages: 'getFullMessages',
        getChangableMessage: 'getChangableMessage',
    },
    uploadApi: {
        profileUpload: {
            user: 'userUploadProfile',
            chat: 'chatUploadProfile',
        }
    },
    downloadApi: {
        profileImage: 'profileImage'
    },
    basic: {
        cnt:'cnt'
    }
};

const accessLevel = {
    superAdmin: 'superAdmin',
    admin: 'admin',
    member: 'member',
};

const supportValue = {
    country: [
        'Iran (Islamic Republic of)'
    ],
    language: {
        en: 'en',
        fa: 'فارسی'
    },
    notificationModel: {
        FCM: 'fcm'
    },
    access: {
        superAdmin: accessLevel.superAdmin,
        admin: accessLevel.admin,
        member: accessLevel.member,
        accessLevel: [
            accessLevel.member,
            accessLevel.admin,
            accessLevel.superAdmin,
        ]
    },
    minLinkSize: 10,
    minTitleSize: 1,
    fullChatKey: [
        '_id',
        'title',
        'type',
        'membersCount',
        'membersID',
        'admin',
        'superAdmin',
        'photoURL',
        'username',
        'link',
        'description',
        'accessModifier',
        'changeChatTime',
        'accessLevel',
        'chatID'

    ],
    fullMessageKey: {
        '_id': 0,
        'serverReceivedTime': 1,
        'seenCount': 1,
        'messageText': 1,
        'senderUserID': 1,
        'random_id': 1,
        'lastEditTime': 1,
        'messageCount': 1,
        'type': 1,
        'extra_data': 1,
        'hashID': 1
    },
    limitedChatKey: {
        '_id': 0,
        'title': 1,
        'type': 1,
        'photoURL': 1,
        'changeChatTime': 1,
        'chatID': 1

    },
    userInfoKey: {
        '_id': 0,
        'profileImage': 1,
        'lastActivityTime': 1,
        'lastProfileChange': 1,
        'firstName': 1,
        'lastName': 1,
        'bio': 1,
        'userID': 1,
        'username': 1,
        'email': 1,

    },
    limitedUserKey: {
        // '_id':1,
        'lastActivityTime': 1,
        'firstName': 1,
        'lastName': 1,
        'profileImage': 1,
        'userID': 1,
        'lastProfileChange': 1

    },
    chatUpdate: [
        'title',
        'photoURL',
        'description',
        'accessModifier',
        'changeChatTime'
    ],
    accessModifier: {
        private: 'private',
        public: 'public'
    },
    chatType: {
        group: 'group',
        channel: 'channel',
        shop: 'shop',
        privateChat: 'privateChat'
    },
    groupType: {
        normal: 'normal',
        super: 'super'
    },
    usernamePattern: {
        channel: new RegExp("([A-Za-z0-9])+_channel"),
        shop: new RegExp("([A-Za-z0-9])+_shop"),
    }
};

const apiType = {
    err: 'Error',
    warning: 'Warning',
    all: 'API_All',
    authentication: 'API_Authentication',
    contact: 'API_Contact',
    chat: 'chat',
    user: 'user',
    message: 'message'

};

const permission = {
    notNeedTokenApi: [
        allApi.authentication.checkPhone,
        allApi.authentication.sendCode,
        allApi.authentication.sendSms,
        allApi.authentication.signUp,
        allApi.authentication.signIn,
    ],
    NumberOfAuthenticationReq: 10020
};
/*
* todo Mahdi Khazayi Nezhad 11/03/2019 (debug) : NumberOfAuthenticationReq beshe 20
*/

const defaultValue = {
    language: supportValue.language.en,
    verifyCodeLength: 5,
    ExpireVerifyCodeTime: 5 * 60 * 1000,    // 5 min
    sendSmsServiceUrl: 'http://37.130.202.188/api/select',
    addContactLimitation: 2000,
    addContactResetPeriod: 3 * 31 * 24 * 60 * 60 * 1000,     // 3 month
    descriptionLength: 300,
    messageLengthNothif: 60,
    timeToSendNotif:5*1000
};

const string = {
    'فارسی': {
        singUpFalse: 'sorry your phone number can`t sing in Ima',
        singUpVerifyCodeErr: 'your verify code not current try again',
        singUpTrue: 'welcome to Ima',
        verifySmsMessage: '{{code}} کد فعال سازی شما در ایما می باشد \n خوش آمدید.',
    },
    'en': {
        singUpFalse: 'sorry your phone number can`t sing in Ima',
        singUpVerifyCodeErr: 'your verify code not current try again',
        singUpTrue: 'welcome to Ima',
        verifySmsMessage: '{{code}} کد فعال سازی شما در ایما می باشد \n خوش آمدید.',
    }
};

const errCode = {
    internal_err: 'internal_err',
    not_implemented: 'not_implemented',
    error_code_not_found: 'error_code_not_found',
    token_field_not_found: 'token_field_not_found',
    token_user_not_found: 'token_user_not_found',
    invalid_arguments: 'invalid_arguments',
    arguments_not_found: 'arguments_not_found',
    method_not_found: 'method_not_found',
    data_not_found: 'data_not_found',
    empty_argumnet: 'empty_argumnet',
    authentication: {
        user_delete_spam: 'user_delete_spam',
        phone_number_not_found: 'phone_number_not_found',
        token_illegal_sing_up: 'token_illegal_sing_up',
        user_already_exist: 'user_already_exist',
        phone_not_valid: 'phone_not_valid',
        country_not_support: 'country_not_support',
        language_not_support: 'language_not_support',
        notification_model_not_support: 'notification_model_not_support',
        device_spam: 'device_spam',
        device_argument: 'device_argument'
    },
    contact: {
        contact_format_invalid: 'contact_format_invalid',
        add_contact_limitation_reached: "add_contact_limitation_reached"
    },
    chat: {
        chat_not_found: 'chat_not_found',
        access_denied_chat: 'access_denied_chat',
        link_size_problem: 'link_size_problem',
        title_size_problem: 'title_size_problem',
        access_level_denied: 'access_level_denied',
        username_pattern_denied: 'username_pattern_denied',
        user_exist: 'user_exist',
        your_self_user: 'your_self_user',
    },
    message: {
        message_not_found: 'message_not_found',
        access_denied_message: 'access_denied_message',
        message_type_not_denied: 'message_type_not_denied',
        access_denied_send: 'access_denied_send',
        replay_message_not_found: 'replay_message_not_found'
    }
};
const fileType = {
    UserProfileImage: 'UserProfileImage',
    ChatProfileImage: 'ChatProfileImage',
};

const fileCategory = {
    profile: 'profile'
};
const messageType = {
    text: 'text',
    money: 'money',
};

module.exports = {
    api: allApi,

    apiType: apiType,

    permission: permission,

    support: supportValue,

    defaultValue: defaultValue,

    string: string,

    errCode: errCode,

    fileType: fileType,

    fileCategory: fileCategory,

    messageType: messageType

};