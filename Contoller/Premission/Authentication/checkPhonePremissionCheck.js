var CheckPhone = require('../../API/Authentication/CheckPhone');
module.exports = {
    check: function (data,user) {
        //check all for chackPhone
        return CheckPhone.call(data.data,user);
    }
}
