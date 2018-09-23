var getAllContacts = require('../../API/Contact/getAllContacts');
var addContactsPermission = require('./addContactsPermissionCheck');
var updateContact = require('./updateContactPermissionCheck');
var err = require('../../Model/error');
var logd = require('../../Other/Funcion').logd;
var pv = require('../../Other/PublicValue');
var db = require('../../DB/db');

function contactFormatValidation(contact) {
    for (var key in contact) {
        if (key !== "first_name" && key !== "last_name" && key !== "phone_number") {
            return false;
        }
    }
    if (!contact.hasOwnProperty("phone_number") || !contact.hasOwnProperty("first_name") || !contact.hasOwnProperty("last_name")) {
        return false;
    }
    return true;
}

module.exports = {

    check: function (input, user, client, outputCallBack) {
        //todo check koliat az ghabil in ke in methode vojod dare age nadare
        //todo #DB

        var data = input.data;

        switch (input.method) {
            case pv.api.contacts.getAllContacts:
                getAllContacts.getAllContacts(user, outputCallBack);
                break;

            case pv.api.contacts.addContacts:
                for (let i = 0; i < data.contacts.length; i++) {
                    if (!contactFormatValidation(data.contacts[i])) {
                        outputCallBack(new err(pv.errCode.contact.contact_format_invalid).jsonErr());
                        return;
                    }
                }
                addContactsPermission.check(data.contacts,user,outputCallBack); // todo
                break;
            case pv.api.contacts.updateContact:
                updateContact.check(user, data, outputCallBack);
                break;
            default:
                outputCallBack(new err(pv.errCode.method_not_found).jsonErr());
                return;
        }
    }
};

