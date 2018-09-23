var db = require("../../DB/db")
let logd=require("../../Other/Funcion").logd;
function call(contacts, user, callback) {
    var promise = [];
    var lookedUpContacts = [];
    // TODO optimise query
    logd('in addContact Api');
    for (let i = 0; i < contacts.length; i++) {
        promise.push(db.getUserByPhoneNumber_promise(contacts[i].phone_number));
    }
    logd('in addContact after all promise add',promise.length);
    Promise.all(promise).then(function (values) {
        logd('in addContact in then promise',values.length);
        for (let i = 0; i < values.length; i++) {
            if (values[i]) {
                contacts[i].userID = values[i].userID;
            }
            lookedUpContacts.push(contacts[i]);
        }
        logd('in addContact in then promise',lookedUpContacts.length);
        db.addContacts(user, lookedUpContacts, (result)=>{
            callback({data:result})
        });
    });

}

module.exports = {
    call: call
};