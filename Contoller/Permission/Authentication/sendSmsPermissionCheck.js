var err = require('../../Model/error');
var warn = require('../../Model/warning');
var User = require('../../Model/user');
var pv = require('../../Other/PublicValue');
module.exports = {
    check: function (data, user, outputCallBack) {
        //check all for checkPhone
        return new Promise(async (resolve, reject) => {
            var extraData = undefined;
            if (!user) {
                reject(new err(pv.errCode.authentication.phone_number_not_found).jsonErr());
            }
            if (user.spam.length > 0) {
                let date = new Date().getTime();
                for (let i = 0; i < user.spam.length; i++) {
                    if (user.spam[i].type === 'outApp' && user.spam[i].nextAccessTime > date) {
                        reject(new err(pv.errCode.authentication.user_delete_spam, undefined, {'next_active_time': user.spam[i].nextAccessTime}));
                    }
                }

            }
            try {
                const result=await require('../../API/Authentication/SendSmS')(user).call();
                if (extraData !== undefined)
                    result.warning = extraData;
                resolve(result);
            } catch (e){
                reject(e);

            }

        });
    }
};
