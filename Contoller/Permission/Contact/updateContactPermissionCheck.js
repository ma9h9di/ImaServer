const err = require('../../Model/error');
const updateContactApi = require('../../API/Contact/updateContact');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (user, data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.hasOwnProperty('contact')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['contact']}).jsonErr());
                }
                if (!data.hasOwnProperty('operation')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['operation']}).jsonErr());
                }
                let updateContact = data.contact;

                if (!updateContact.hasOwnProperty('first_name')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['first_name']}).jsonErr());
                }

                if (!updateContact.hasOwnProperty('last_name')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['last_name']}).jsonErr());
                }

                if (!updateContact.hasOwnProperty('phone_number')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['phone_number']}).jsonErr());
                }

                //age ezafi dasht eybi nadare age kam dashte bashe eyb dare :|

                // for (let key in data.contact) {
                //     if (key !== "first_name" && key !== "last_name" && key !== "phone_number") {
                //         outputCallBack(new err(pv.errCode.contact.contact_format_invalid).jsonErr());
                //         return;
                //     }
                // }
                // if (!data.contact.hasOwnProperty("phone_number") || !data.contact.hasOwnProperty("first_name") || !data.contact.hasOwnProperty("last_name")) {
                //     outputCallBack(new err(pv.errCode.contact.contact_format_invalid).jsonErr());
                //     return;
                // }

                const updateContact1 = await updateContactApi.call(user, updateContact, data.operation);
                resolve(updateContact1);
            } catch (e) {
                reject(e);
            }
        });


    }
};
