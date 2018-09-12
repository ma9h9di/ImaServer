var getAllContacts = require('../../API/Contact/getAllContacts');
var updateContacs = require('../../API/Contact/');
var addContactPermission = require('addContactsPermissionCheck')
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
                        outputCallBack(new Err(pv.errCode.contact.contact_format_invalid).jsonErr());
                        return;
                    }
                }
                addContactPermission.check(data.contacts); // todo
                break;
            case pv.api.contacts.updateContact:
                for (var key in data.contact) {
                    if (key !== "first_name" && key !== "last_name" && key !== "phone_number") {
                        outputCallBack(new Err(pv.errCode.contact.contact_format_invalid).jsonErr());
                        return;
                    }
                }

                break;
            default:
                myCallBack(new err(pv.errCode.method_not_found).jsonErr());
                return;
        }
    }
};

