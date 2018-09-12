var db = require("../../DB/db")

function addContacts(contacts, user, callback) {
    var promise = [];
    var lookedUpContacts = [];
    // TODO optimise query
    for (let i = 0; i < contacts.length; i++) {
        promise.push(db.getUserByPhoneNumber_promise(contacts[i].phone_number));
    }
    Promise.all(promise).then(function (values) {
        for (let i = 0; i < values.length; i++) {
            if (!values[i]) {
                lookedUpContacts.push(contacts[i]);
            } else {
                contacts[i].userID = values[i].userID;
                lookedUpContacts.push(newContact);
            }
        }
        db.addContacts(user, contacts, callback);
    });
    // push promise to db and return it
}

module.exports = {
    addContacts: addContacts
};