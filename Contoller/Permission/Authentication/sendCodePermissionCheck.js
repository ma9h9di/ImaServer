var err = require('../../Model/error');
var warn = require('../../Model/warning');
var User = require('../../Model/user');
var pv = require('../../Other/PublicValue');
module.exports = {
    check: function (data, user,outputCallBack) {
        //check all for checkPhone
        var extraData=undefined;
        if (!user) {
            outputCallBack(new err(pv.errCode.authentication.phone_number_not_found).jsonErr());
            return;
        }
        if (user.spam.length > 0) {
            var mSpam = [];
            for (let i = 0; i < user.spam.length; i++) {
                if (user.spam[i].type === 'outApp') {
                    mSpam.push(user.spam[i]);
                }
            }
            if (mSpam.length > 0) {
                outputCallBack(new err(pv.errCode.authentication.user_delete_spam, undefined, mSpam));
                return;
            }

        }

        require('../../API/Authentication/SendCode')(user).call((result) => {
            if (extraData !== undefined)
                result.warning = extraData;
            outputCallBack(result);
        });
    }
};
