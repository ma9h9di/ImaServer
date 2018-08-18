var CheckPhone = require('../../API/Authentication/CheckPhone');
var User = require('../../Model/user');
module.exports = {
    check: function (data,user) {
        //check all for chackPhone
        if (!user) {
            // db.createUser(data.phone_number);
            user=User.CreateNewUser(data.phone_number)
        }
        return CheckPhone.call(data,user);
    }
}
