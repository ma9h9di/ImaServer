var err = require('../../Model/error');
var warn = require('../../Model/warning');
var User = require('../../Model/user');
var pv = require('../../Other/PublicValue');
module.exports = {
    check: function (data, user) {
        //check all for checkPhone
        var extraData=undefined;
        if (!user) {
            return new err(pv.errCode.authentication.phone_number_not_found).jsonErr();
        }
        if (user.spam.length > 0) {
            var mSpam = [];
            for (let i = 0; i < user.spam.length; i++) {
                if (user.spam[i].type === 'outApp') {
                    mSpam.push(user.spam[i]);
                }
            }
            if (mSpam.length > 0) {
                return new err(pv.errCode.authentication.user_delete_spam, undefined, mSpam);
            }

        }
        var result = require('../../API/Authentication/SendCode')(user).call();
        if (extraData!==undefined)
            result.warning = extraData;
        return result;
    }
};
