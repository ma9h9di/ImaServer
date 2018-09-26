var err = require('../../Model/error');
var User = require('../../Model/user');
var updateContact = require('../../API/Contact/updateContact');

var pv = require('../../Other/PublicValue');

module.exports = {
    check: function (user, data, outputCallBack) {
        for (var key in data.contact) {
            if (key !== "first_name" && key !== "last_name" && key !== "phone_number") {
                outputCallBack(new err(pv.errCode.contact.contact_format_invalid).jsonErr());
                return;
            }
        }
        if (!data.contact.hasOwnProperty("phone_number") || !data.contact.hasOwnProperty("first_name") || !data.contact.hasOwnProperty("last_name")) {
            outputCallBack(new err(pv.errCode.contact.contact_format_invalid).jsonErr());
            return;
        }
        updateContact.updateContact(user, data.contact, outputCallBack);
    }
};
