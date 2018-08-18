var allApi = {
    authentication: {
        'checkPhone': 1,
        'sendCode': 2,
        'sendSms': 3,
        'signUp': 4,
        'signIn': 5,
        'logOut': 6,
        'removeSession': 7
    }
};
module.exports = {
    api: allApi,
    apiType: {
        err: 'Error',
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
        NumberOfAuthenticationReq: 20
    },
    errCode: {
        'error_code_not_found': '0001',
        'user_delete_spam': '0002',
        'token_field_not_found': '0003',
        'token_user_not_found': '0004',
        'invalid_arguments': '0005',
        'arguments_not_found': '0006',
        'method_not_found': '0007',
        'data_not_found': '0008',
        'authentication': {

            'phone_number_not_found': '0101',
            'token_illegal_sign_up': '0102',
            'user_already_exists': '0103',
            'phone_number_not_valid': '0104',
            'country_not_supported': '0105',
            'language_not_supported': '0106',
            'device_spam': '0107',
            'device_invalid': '0108'
        }
    }
};