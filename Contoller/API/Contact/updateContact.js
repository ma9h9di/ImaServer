var db = require("../../DB/db")

function updateContact(user, contact, callback) {
    db.updateContact(user, contact, callback);
}

module.exports = {
    updateContact: updateContact
};