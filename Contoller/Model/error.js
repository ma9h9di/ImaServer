var errors = require('../Other/Errors');
var logd = require('../Other/Funcion').logd;

var pv = require('../Other/PublicValue');

class Error {

    jsonErr() {
        return {
            error: [this.mErr],
            type: pv.apiType.err
        }
    }

    findThisErr(code) {
        logd(code);
        for (let i = 0; i < errors.err.length; i++) {
            if (errors.err[i].code === code)
                return errors.err[i];
        }
    }

    constructor(code, message, error_data) {
        this.mErr = this.findThisErr(code);
        // console.log('find %j',this.mErr);
        if (message !== undefined)
            this.mErr.message = message;
        if (error_data !== undefined)
            this.mErr.error_data = error_data;
    }


}

module.exports = Error;