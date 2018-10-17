var pv = require('./PublicValue');
var Warning = [ //if error occure data is nothing
    {
        'title': 'language not support',
        'code': pv.errCode.authentication.language_not_support,
        'message': 'we don`t support this language and we use default language (en) for you',
        'type': pv.apiType.authentication,
        'warning_data': {}
    }
]
module.exports = {warn: Warning};