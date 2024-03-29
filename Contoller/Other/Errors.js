var pv = require('./PublicValue');
var Errors = [ //if error occure data is nothing
    // global error
    {
        'title': 'internal error',
        'code': pv.errCode.internal_err,
        'message': 'Sorry, there is an internal problem for the system',
        'type': pv.apiType.all,
        'error_data': {}
    },
    {
        'title': 'error code not found',
        'code': pv.errCode.error_code_not_found,
        'message': 'can`t found error code',
        'type': pv.apiType.all,
        'error_data': {}
    },
    {
        'title': 'user delete account spam',
        'code': pv.errCode.user_delete_spam,
        'message': 'This is a spam user',
        'type': pv.apiType.all,
        'error_data': {}
    },
    {
        'title': 'token field not found',
        'code': pv.errCode.token_field_not_found,
        'message': 'token field does not exist',
        'type': pv.apiType.all,
        'error_data': {}
    },
    {
        'title': 'token user not found',
        'code': pv.errCode.token_user_not_found,
        'message': 'invalid token',
        'type': pv.apiType.all,
        'error_data': {}
    },
    {
        'title': 'invalid arguments',
        'code': pv.errCode.invalid_arguments,
        'message': 'use bad argument',
        'type': pv.apiType.all,
        'error_data': {}
    },
    {
        'title': 'arguments not found',
        'code': pv.errCode.arguments_not_found,
        'message': 'same of argument dose not exist',
        'type': pv.apiType.all,
        'error_data': {}
    },
    {
        'title': 'method not found',
        'code': pv.errCode.method_not_found,
        'message': 'this method dose not exist',
        'type': pv.apiType.all,
        'error_data': {}
    },
    {
        'title': 'data not found',
        'code': pv.errCode.data_not_found,
        'message': 'you don`t send data',
        'type': pv.apiType.all,
        'error_data': {}
    },


    //authentication error

    {
        'title': 'phone number not found',
        'code': pv.errCode.authentication.phone_number_not_found,
        'message': 'this phone number not exist',
        'type': pv.apiType.authentication,
        'error_data': {}
    },
    {
        'title': 'token is illegal in sing up',
        'code': pv.errCode.authentication.token_illegal_sing_up,
        'message': 'this phone number can`t sing up by this token',
        'type': pv.apiType.authentication,
        'error_data': {}
    },
    {
        'title': 'user is already exist',
        'code': pv.errCode.authentication.user_already_exist,
        'message': 'can`t sing up the phone number ',
        'type': pv.apiType.authentication,

        'error_data': {}
    },
    {
        'title': 'phone not valid',
        'code': pv.errCode.authentication.phone_not_valid,
        'message': 'this phone number not in valid format',
        'type': pv.apiType.authentication,
        'error_data': {}
    },
    {
        'title': 'country not support',
        'code': pv.errCode.authentication.country_not_support,
        'message': 'we don`t support your country',
        'type': pv.apiType.authentication,
        'error_data': {}
    },
    {
        'title': 'notification model not support',
        'code': pv.errCode.authentication.notification_model_not_support,
        'message': 'we don`t support your notification model',
        'type': pv.apiType.authentication,
        'error_data': {}
    },
    {
        'title': 'device spam',
        'code': pv.errCode.authentication.device_spam,
        'message': 'This is a spam device',
        'type': pv.apiType.all,
        'error_data': {}
    },
    {
        'title': 'device argument',
        'code': pv.errCode.authentication.device_argument,
        'message': 'error device argument has error',
        'type': pv.apiType.all,
        'error_data': {}
    },

    // contact

    {
        'title': 'contact format invalid',
        'code': pv.errCode.contact.contact_format_invalid,
        'message': 'contact format invalid',
        'type': pv.apiType.contact,
        'error_data': {}
    },
    {
        'title': 'add contact limitation reached',
        'code': pv.errCode.contact.add_contact_limitation_reached,
        'message': 'Contact limitation reached. Try again later',
        'type': pv.apiType.contact,
        'error_data': {}
    }
];


module.exports = {err: Errors};
