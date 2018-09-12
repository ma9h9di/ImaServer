var db = require("../../DB/db")

function getAllContacts(user, callback) {
    db.getAllContacts(user, callback);
}

module.exports = {
    getAllContacts: getAllContacts
};