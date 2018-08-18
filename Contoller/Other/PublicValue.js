var allApi= {
    authentication: {
        'checkPhone': 'checkPhone',
        'sendCode': 'sendCode',
        'sendSms':'sendSms',
        'signUp': 'signUp',
        'signIn': 'signIn',
        'logOut': 'logOut',
        'removeSession': 'removeSession'
    }
};
var suportValue={
    country: {
        iran: '+98'
    },
    language:{
        en:'en'
    }
};
module.exports = {
    api:allApi,
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
        ],
        NumberOfAuthenticationReq:20
    },
    support:suportValue,
    defultValue:{
        language:suportValue.language.english
    },
    errCode: {
        'json_parse_err': 'json_parse_err',
        'error_code_not_found': 'error_code_not_found',
        'token_field_not_found': 'token_field_not_found',
        'token_user_not_found': 'token_user_not_found',
        'invalid_arguments': 'invalid_arguments',
        'arguments_not_found': 'arguments_not_found',
        'method_not_found': 'method_not_found',
        'data_not_found': 'data_not_found',
        'authentication': {
            'user_delete_spam': 'user_delete_spam',
            'phone_number_not_found': 'phone_number_not_found',
            'token_illegal_sing_up': 'token_illegal_sing_up',
            'user_already_exist': 'user_already_exist',
            'phone_not_valid': 'phone_not_valid',
            'country_not_support': 'country_not_support',
            'language_not_support': 'language_not_support',
            'device_spam': 'device_spam',
            'device_argument': 'device_argument'
        }
    }
}