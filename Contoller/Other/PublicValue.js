var allApi = {
    authentication: {
        checkPhone: 'checkPhone',
        sendCode: 'sendCode',
        sendSms: 'sendSms',
        signUp: 'singUp',
        signIn: 'singIn',
        logOut: 'logOut',
        removeSession: 'removeSession'
    }
};
var suportValue = {
    country: {
        iran: '+98'
    },
    language: {
        en: 'en'
    },
    notificationModel: {
        FCM: 'fcm'
    }
};
module.exports = {
    api: allApi,
    apiType: {
        err: 'Error',
        warning: 'Warning',
        all: 'API_All',
        authentication: 'API_Authentication',

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
    support: suportValue,
    defaultValue: {
        language: suportValue.language.en,
        verifyCodeLength: 5,
        ExpireVerifyCodeTime: 5 * 60 * 1000,
        sendSmsServiceUrl:'http://37.130.202.188/api/select'
    },

    string: {
        en: {
            singUpFalse:'sorry your phone number can`t sing in Ima',
            singUpVerifyCodeErr:'your verify code not current try again',
            singUpTrue:'welcome to Ima',
            verifySmsMessage:'{{code}} کد فعال سازی شما در ایما می باشد \n خوش آمدید.',
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
        }
    },

}