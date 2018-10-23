var db = require("../../DB/db");

function updateContact(user, contact,operation, callback) {
    //todo if contact change bayad baghie session ha ham befann

    if (operation==='update') {
        db.updateContact(user, contact,()=>{
            //todo ok nabodo check nakardim
            callback({data:{contact:contact}})
        } );
    }
    else if (operation==='delete') {
        db.deleteContact(user, contact,()=>{
            //todo ok nabodo check nakardim
            callback({data:{contact:contact}})
        } );
    }
}

module.exports = {
    call: updateContact
};