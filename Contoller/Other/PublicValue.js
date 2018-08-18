var allAapi= {
    authentication: {
        'checkPhone': 1,
        'sendCode': 2,
        'sendSms': 3,
        'signUp': 4,
        'signIn': 5,
        'logOut': 6,
        'removeSession': 7
    }
}
module.exports = {
    api:allAapi,
    apiType: {
        err: 'Error',
        all: 'API_All',
        authentication: 'API_Authentication',

    },
    permission: {
        notNeedTokenApi: [
            allAapi.authentication.checkPhone,
            allAapi.authentication.sendCode,
            allAapi.authentication.sendSms,
            allAapi.authentication.signUp,
        ],
        NumberOfAuthenticationReq:20
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
            'token_illegal_sing_up': '0102',
            'user_already_exist': '0103',
            'phone_not_valid': '0104',
            'country_not_support': '0105',
            'language_not_support': '0106',
            'device_spam': '0107',
            'device_argument': '0108'
        }
    }
}