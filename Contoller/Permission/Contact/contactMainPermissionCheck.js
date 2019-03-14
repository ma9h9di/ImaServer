const getAllContacts = require('../../API/Contact/getAllContacts');
const addContactsPermission = require('./addContactsPermissionCheck');
const updateContact = require('./updateContactPermissionCheck');
const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

function contactFormatValidation(contact) {
    for (let key in contact) {
        if (key !== "first_name" && key !== "last_name" && key !== "phone_number") {
            return false;
        }
    }
    return !(!contact.hasOwnProperty("phone_number") || !contact.hasOwnProperty("first_name") || !contact.hasOwnProperty("last_name"));

}

module.exports = {

    check: function (input, user) {
        //todo check koliat az ghabil in ke in methode vojod dare age nadare
        //todo #DB
        return new Promise(async (resolve, reject) => {
            try {

                let data = input.data;
                user.changeAttribute = [];
                let checkAnswer;
                switch (input.method) {
                    case pv.api.contacts.getAllContacts:
                        checkAnswer = await getAllContacts.getAllContacts(user);
                        break;

                    case pv.api.contacts.addContacts:
                        for (let i = 0; i < data.contacts.length; i++) {
                            if (!contactFormatValidation(data.contacts[i])) {
                                return reject(new err(pv.errCode.contact.contact_format_invalid).jsonErr());

                            }
                        }
                        checkAnswer = await addContactsPermission.check(data.contacts, user); // todo
                        break;
                    case pv.api.contacts.updateContact:
                        checkAnswer = await updateContact.check(user, data);
                        break;
                    default:
                        return reject(new err(pv.errCode.method_not_found).jsonErr());

                }
                return resolve(checkAnswer);
            } catch (e) {
                return reject(e);
            }
        });

    }
};

