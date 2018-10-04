const err = require('../../Model/error');
const updateContactApi = require('../../API/Contact/updateContact');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (user, data, outputCallBack) {

        if (!data.hasOwnProperty('contact')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['contact']}).jsonErr());
            return;
        }

        let updateContact=data.contact;

        if (!updateContact.hasOwnProperty('first_name')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['first_name']}).jsonErr());
            return;
        }

        if (!updateContact.hasOwnProperty('last_name')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['last_name']}).jsonErr());
            return;
        }

        if (!updateContact.hasOwnProperty('phone_number')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['phone_number']}).jsonErr());
            return;
        }

        //age ezafi dasht eybi nadare age kam dashte bashe eyb dare :|

        // for (var key in data.contact) {
        //     if (key !== "first_name" && key !== "last_name" && key !== "phone_number") {
        //         outputCallBack(new err(pv.errCode.contact.contact_format_invalid).jsonErr());
        //         return;
        //     }
        // }
        // if (!data.contact.hasOwnProperty("phone_number") || !data.contact.hasOwnProperty("first_name") || !data.contact.hasOwnProperty("last_name")) {
        //     outputCallBack(new err(pv.errCode.contact.contact_format_invalid).jsonErr());
        //     return;
        // }

        updateContactApi.call(user, updateContact, outputCallBack);
    }
};
