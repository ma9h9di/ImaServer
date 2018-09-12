var db = require("../../DB/db")

function updateContact(user, callback) {
    db.updateContact(user, callback);
}

module.exports = {
    updateContact: updateContact
};