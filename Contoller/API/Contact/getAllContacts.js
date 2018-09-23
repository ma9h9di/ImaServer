var db = require("../../DB/db")

function getAllContacts(user, callback) {
    db.getAllContacts(user, (result)=>{
        callback({data:result})
    });
}

module.exports = {
    getAllContacts: getAllContacts
};