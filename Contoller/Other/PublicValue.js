var allApi = {
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
    chat:{
        getFullChat:'getFullChat',
        getChats:'getChats',
        checkChannelUsername:'checkChannelUsername',
        updateChannelUsername:'updateChannelUsername',
        setChatInfo:'setChatInfo',
        addChatUser:'addChatUser',
        removeUser:'removeUser',
        deleteChat:'deleteChat',
        createGroup:'createGroup',
        createChannel: 'createChannel',
        createShop: 'createShop',
        createLink: 'createLink',
        getLink: 'getLink',
        getPin: 'getPin',
        setPin: 'setPin',
    }
};
let accessLevek = {
    superAdmin: 'superAdmin',
    admin: 'admin',
    member: 'member',
};

let supportValue = {
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
        superAdmin: accessLevek.superAdmin,
        admin: accessLevek.admin,
        member: accessLevek.member,
        accessLevel : [
            accessLevek.member,
            accessLevek.admin,
            accessLevek.superAdmin,
        ]
    },
    minLinkSize: 10,
};
module.exports = {
    api: allApi,
    apiType: {
        err: 'Error',
        warning: 'Warning',
        all: 'API_All',
        authentication: 'API_Authentication',
        contact: 'API_Contact',
        chat:'chat'

    },
    permission: {
        notNeedTokenApi: [
            allApi.authentication.checkPhone,
            allApi.authentication.sendCode,
            allApi.authentication.sendSms,
            allApi.authentication.signUp,
            allApi.authentication.signIn,
        ],
        NumberOfAuthenticationReq: 20
    },
    support: supportValue,
    defaultValue: {
        language: supportValue.language.en,
        verifyCodeLength: 5,
        ExpireVerifyCodeTime: 5 * 60 * 1000,    // 5 min
        sendSmsServiceUrl: 'http://37.130.202.188/api/select',
        addContactLimitation: 2000,
        addContactResetPeriod: 3 * 31 * 24 * 60 * 60 * 1000,     // 3 month
        descriptionLength: 300,
    },

    string: {
        'فارسی': {
            singUpFalse: 'sorry your phone number can`t sing in Ima',
            singUpVerifyCodeErr: 'your verify code not current try again',
            singUpTrue: 'welcome to Ima',
            verifySmsMessage: '{{code}} کد فعال سازی شما در ایما می باشد \n خوش آمدید.',
        }
    },
    errCode: {
        internal_err: 'internal_err',
        error_code_not_found: 'error_code_not_found',
        token_field_not_found: 'token_field_not_found',
        token_user_not_found: 'token_user_not_found',
        invalid_arguments: 'invalid_arguments',
        arguments_not_found: 'arguments_not_found',
        method_not_found: 'method_not_found',
        data_not_found: 'data_not_found',
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
        chat:{
            chat_not_found:'chat_not_found',
            access_denied_chat: 'access_denied_chat',
            link_size_problem: 'link_size_problem',
            access_level_denied: 'access_level_denied',
        }
    },

}