const errors = require('../Other/Errors');
const logd = require('../Other/Funcion').logd;

const pv = require('../Other/PublicValue');

class Error {

    jsonErr() {
        return {
            error: [this.mErr],
            type: pv.apiType.err
        };
    }

    findThisErr(code) {
        logd(code);
        for (let i = 0; i < errors.err.length; i++) {
            if (errors.err[i].code === code)
                return JSON.parse(JSON.stringify(errors.err[i]));
        }
    }

    constructor(code, message, error_data) {
        this.mErr = this.findThisErr(code);
        if (message !== undefined)
            this.mErr.message = message;
        if (error_data !== undefined)
            this.mErr.error_data = error_data;
    }


}

module.exports = Error;